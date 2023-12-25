import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon, Button, DeleteIcon, Input } from "@illa-design/react"
import { RecordEditorProps } from "./interface"
import {
  applyRecordEditorContainerStyle,
  recordEditorLabelStyle,
  recordEditorStyle,
  recordStyle,
  subLabelStyle,
} from "./style"

export const RecordEditor: FC<RecordEditorProps> = (props) => {
  const {
    readOnly,
    fillOnly,
    name,
    records,
    label,
    subLabel,
    onSubLabelClick,
    onDelete,
    onAdd,
    onChangeKey,
    onChangeValue,
  } = props

  const { t } = useTranslation()

  return (
    <div css={applyRecordEditorContainerStyle(label)}>
      {label != "" && (
        <span css={recordEditorLabelStyle}>
          <span>{label}</span>
          {subLabel && (
            <span css={subLabelStyle} onClick={onSubLabelClick}>
              {subLabel}
            </span>
          )}
        </span>
      )}
      <div css={recordEditorStyle}>
        {records?.map((record, index) => {
          return (
            <div css={recordStyle} key={index}>
              <Input
                colorScheme={"techPurple"}
                height="32px"
                value={record.key}
                readOnly={fillOnly || readOnly}
                minW="160px"
                width="0"
                flexGrow="1"
                bdRadius="8px 0 0 8px"
                placeholder="key"
                onChange={(value) => {
                  onChangeKey?.(
                    index,
                    value.replace(/[ {}\s]/g, "").trim(),
                    record.value,
                    name,
                  )
                }}
              />
              <Input
                colorScheme={"techPurple"}
                height="32px"
                bdRadius={fillOnly || readOnly ? "0 8px 8px 0" : "0"}
                ml="-1px"
                readOnly={readOnly}
                placeholder="value"
                minW="160px"
                width="0"
                flexGrow="1"
                value={record.value}
                onChange={(value) => {
                  onChangeValue?.(
                    index,
                    record.key,
                    value.replace(/{{|}}/g, ""),
                    name,
                  )
                }}
              />
              {!(fillOnly || readOnly) && (
                <Button
                  type="button"
                  ml="-1px"
                  minW="32px"
                  variant="outline"
                  bdRadius="0 8px 8px 0"
                  colorScheme="grayBlue"
                  onClick={() => {
                    onDelete?.(index, record, name)
                  }}
                  leftIcon={<DeleteIcon />}
                />
              )}
            </div>
          )
        })}
        {!(fillOnly || readOnly) && (
          <span>
            <Button
              type="button"
              mb="8px"
              pd="1px 8px"
              colorScheme="techPurple"
              size="medium"
              variant="text"
              onClick={() => {
                onAdd?.(name)
              }}
              leftIcon={<AddIcon />}
            >
              {t("editor.action.panel.btn.new")}
            </Button>
          </span>
        )}
      </div>
    </div>
  )
}

RecordEditor.displayName = "RecordEditor"
