import { closeCompletion } from "@codemirror/autocomplete"
import {
  Compartment,
  EditorState,
  Extension,
  StateEffect,
} from "@codemirror/state"
import {
  EditorView,
  placeholder as placeholderExtension,
} from "@codemirror/view"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useBasicSetup } from "./extensions"
import { ILLACodeMirrorProps } from "./interface"
import { applyEditorWrapperStyle } from "./style"
import { ILLACodeMirrorTheme } from "./theme"

// thk ReactCodeMirror:https://github.com/uiwjs/react-codemirror
export const ILLACodeMirrorCore: FC<ILLACodeMirrorProps> = (props) => {
  const {
    className,
    value,
    height = "",
    maxHeight = "",
    minHeight = "",
    width = "",
    maxWidth = "",
    minWidth = "",
    editable = true,
    readOnly = false,
    placeholder,
    expressions = [],
    completionOptions,
    onChange,
    onBlur,
    onFocus,
  } = props

  const [isFocus, setIsFocus] = useState(false)

  const editorViewRef = useRef<EditorView>()
  const editorWrapperRef = useRef<HTMLDivElement | null>(null)
  const compartmentsRef = useRef<Compartment[]>([])

  const extensionOptions = useMemo(() => {
    return {
      expressions,
      completionOptions,
    }
  }, [completionOptions, expressions])

  const basicExtensions = useBasicSetup(extensionOptions)

  const defaultThemeOption = useMemo(
    () =>
      EditorView.theme({
        "&": {
          height,
          minHeight,
          maxHeight,
          width,
          maxWidth,
          minWidth,
        },
        ...ILLACodeMirrorTheme,
      }),
    [height, maxHeight, maxWidth, minHeight, minWidth, width],
  )

  const focusUpdateListener: Extension = useMemo(() => {
    return EditorView.updateListener.of((viewUpdate) => {
      if (viewUpdate.focusChanged) {
        setIsFocus(viewUpdate.view.hasFocus)
        const currentString = viewUpdate.state.doc.toString()

        if (viewUpdate.view.hasFocus) {
          onFocus?.()
        } else {
          onBlur?.(currentString)
        }
        if (!viewUpdate.view.hasFocus) {
          setTimeout(() => {
            closeCompletion(viewUpdate.view)
          }, 500)
        }
      }
    })
  }, [onBlur, onFocus])

  const changeUpdateListener: Extension = useMemo(() => {
    return EditorView.updateListener.of((viewUpdate) => {
      const currentString = viewUpdate.state.doc.toString()
      if (viewUpdate.docChanged) {
        onChange?.(currentString)
      }
    })
  }, [onChange])

  const readOnlyStateChangeEffect: Extension = useMemo(
    () => EditorState.readOnly.of(readOnly),
    [readOnly],
  )

  const editableStateChangeEffect: Extension = useMemo(
    () => EditorView.editable.of(editable),
    [editable],
  )

  const placeholderExt: Extension = useMemo(() => {
    return typeof placeholder === "string"
      ? placeholderExtension(placeholder)
      : []
  }, [placeholder])

  const allExtensions = useMemo(() => {
    return [
      basicExtensions,
      defaultThemeOption,
      focusUpdateListener,
      changeUpdateListener,
      readOnlyStateChangeEffect,
      editableStateChangeEffect,
      placeholderExt,
      EditorView.lineWrapping,
    ]
  }, [
    basicExtensions,
    defaultThemeOption,
    focusUpdateListener,
    changeUpdateListener,
    readOnlyStateChangeEffect,
    editableStateChangeEffect,
    placeholderExt,
  ])

  const extensionsWithCompartment = useMemo(() => {
    for (
      let i = compartmentsRef.current.length;
      i < allExtensions.length;
      i++
    ) {
      const compartment = new Compartment()
      compartmentsRef.current.push(compartment)
    }
    return allExtensions.map((ext, index) =>
      compartmentsRef.current[index].of(ext),
    )
  }, [allExtensions])

  useEffect(() => {
    if (
      !editorViewRef.current ||
      (!isFocus && value !== editorViewRef.current.state.doc.toString())
    ) {
      const state = EditorState.create({
        doc: value,
        extensions: extensionsWithCompartment,
      })
      if (editorViewRef.current) {
        editorViewRef.current.setState(state)
      } else {
        if (editorWrapperRef.current) {
          editorViewRef.current = new EditorView({
            state,
            parent: editorWrapperRef.current,
          })
        }
      }
    }
  }, [value, extensionsWithCompartment, isFocus])

  const reconfigure = useCallback(
    (view?: EditorView) => {
      if (view) {
        const effects: StateEffect<unknown>[] = []
        allExtensions.forEach((e, i) => {
          if (compartmentsRef.current[i].get(view.state) !== e) {
            effects.push(compartmentsRef.current[i].reconfigure(e))
          }
        })
        if (effects.length > 0) {
          view.dispatch({ effects })
        }
      }
    },
    [allExtensions],
  )

  useEffect(() => {
    if (editorViewRef.current) {
      reconfigure(editorViewRef.current)
    }
  }, [reconfigure])

  return (
    <div
      ref={editorWrapperRef}
      className={className}
      css={applyEditorWrapperStyle(editable)}
    />
  )
}
