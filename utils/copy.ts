import copy from "copy-to-clipboard"
import { createMessage } from '@illa-design/react'
  import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

const message = createMessage()

export const useCopyToClipboard = () => {
  const { t } = useTranslation()
  const copyToClipboard = useCallback((copiedValue: unknown) => {
    if (copiedValue === undefined || copiedValue === null || copiedValue === "") {
      message.info({
        content: t("empty_copied_tips"),
      })
      return
    }
    message.success({
      content: t("copied"),
    })
    if (typeof copiedValue === "string" || typeof copiedValue === "number") {
      copy(String(copiedValue))
      return
    }
    copy(JSON.stringify(copiedValue))
  }, [t])
  return copyToClipboard
}
