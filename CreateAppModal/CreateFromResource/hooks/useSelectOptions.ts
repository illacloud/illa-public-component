import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { COLUMN_TYPE, FORM_WIDGET_TYPE, RESOURCE_TYPE } from "../interface"
import {
  getClickhouseType,
  getMariaDBType,
  getMsresourceType,
  getMysqlLikeType,
  getPostgresqlLikeType,
  getSnowflakeType,
} from "../utils"

export const useSelectOptions = () => {
  const { t } = useTranslation()
  const NUMBER_INPUT_OPTIONS = useMemo(
    () => [
      {
        label: t("widget.number_input.name"),
        value: FORM_WIDGET_TYPE.NUMBER_INPUT,
      },
      {
        label: t("widget.slider.name"),
        value: FORM_WIDGET_TYPE.SLIDER,
      },
      {
        label: t("widget.rate.name"),
        value: FORM_WIDGET_TYPE.RATE,
      },
      {
        label: t("widget.select.name"),
        value: FORM_WIDGET_TYPE.SELECT,
      },
      {
        label: t("widget.radio_button.name"),
        value: FORM_WIDGET_TYPE.RADIO_BUTTON,
      },
      {
        label: t("widget.radio_group.name"),
        value: FORM_WIDGET_TYPE.RADIO,
      },
    ],
    [t],
  )

  const DATE_OPTIONS = useMemo(
    () => [
      {
        label: t("widget.date.name"),
        value: FORM_WIDGET_TYPE.DATE,
      },
      {
        label: t("widget.date_time.name"),
        value: FORM_WIDGET_TYPE.DATE_TIME,
      },
      {
        label: t("widget.time_picker.name"),
        value: FORM_WIDGET_TYPE.TIME,
      },
    ],
    [t],
  )

  const STRING_INPUT_OPTIONS = useMemo(
    () => [
      {
        label: t("widget.input.name"),
        value: FORM_WIDGET_TYPE.INPUT,
      },
      {
        label: t("widget.textarea.name"),
        value: FORM_WIDGET_TYPE.TEXT_AREA,
      },
      {
        label: t("widget.editable_text.name"),
        value: FORM_WIDGET_TYPE.EDITABLE_TEXT,
      },
      {
        label: t("widget.select.name"),
        value: FORM_WIDGET_TYPE.SELECT,
      },
      {
        label: t("widget.radio_button.name"),
        value: FORM_WIDGET_TYPE.RADIO_BUTTON,
      },
      {
        label: t("widget.radio_group.name"),
        value: FORM_WIDGET_TYPE.RADIO,
      },
      {
        label: t("widget.cascader.name"),
        value: FORM_WIDGET_TYPE.CASCADER,
      },
      {
        label: t("widget.password.name"),
        value: FORM_WIDGET_TYPE.PASSWORD,
      },
      {
        label: t("widget.email.name"),
        value: FORM_WIDGET_TYPE.EMAIL,
      },
      {
        label: t("widget.url.name"),
        value: FORM_WIDGET_TYPE.URL,
      },
    ],
    [t],
  )

  const BOOLEAN_OPTIONS = useMemo(
    () => [
      {
        label: t("widget.switch.name"),
        value: FORM_WIDGET_TYPE.SWITCH,
      },
    ],
    [t],
  )

  const ARRAY_INPUT_OPTIONS = useMemo(
    () => [
      {
        label: t("widget.check_box_group.name"),
        value: FORM_WIDGET_TYPE.CHECKBOX,
      },
      {
        label: t("widget.multiselect.name"),
        value: FORM_WIDGET_TYPE.MULTI_SELECT,
      },
      {
        label: t("widget.switch_group.name"),
        value: FORM_WIDGET_TYPE.SWITCH_GROUP,
      },
    ],
    [t],
  )

  const getSelectValue = useCallback(
    (type?: COLUMN_TYPE) => {
      switch (type) {
        case COLUMN_TYPE.NUMBER:
          return {
            defaultValue: FORM_WIDGET_TYPE.NUMBER_INPUT,
            options: NUMBER_INPUT_OPTIONS,
          }
        case COLUMN_TYPE.DATE:
          return {
            defaultValue: FORM_WIDGET_TYPE.DATE,
            options: DATE_OPTIONS,
          }
        case COLUMN_TYPE.TEXT:
          return {
            defaultValue: FORM_WIDGET_TYPE.INPUT,
            options: STRING_INPUT_OPTIONS,
          }
        case COLUMN_TYPE.BOOLEAN:
          return {
            defaultValue: FORM_WIDGET_TYPE.SWITCH,
            options: BOOLEAN_OPTIONS,
          }
        case COLUMN_TYPE.TAG:
          return {
            defaultValue: FORM_WIDGET_TYPE.CHECKBOX,
            options: ARRAY_INPUT_OPTIONS,
          }
      }
    },
    [
      ARRAY_INPUT_OPTIONS,
      BOOLEAN_OPTIONS,
      DATE_OPTIONS,
      NUMBER_INPUT_OPTIONS,
      STRING_INPUT_OPTIONS,
    ],
  )

  const getInputType = useCallback(
    (resourceType: RESOURCE_TYPE, type: string) => {
      let valueType = COLUMN_TYPE.TEXT
      switch (resourceType) {
        case RESOURCE_TYPE.CLICKHOUSE:
          valueType = getClickhouseType(type)
          break
        case RESOURCE_TYPE.POSTGRESQL:
        case RESOURCE_TYPE.SUPABASEDB:
        case RESOURCE_TYPE.NEON:
        case RESOURCE_TYPE.HYDRA:
          valueType = getPostgresqlLikeType(type)
          break
        case RESOURCE_TYPE.MYSQL:
        case RESOURCE_TYPE.TIDB:
          valueType = getMysqlLikeType(type)
          break
        case RESOURCE_TYPE.MARIADB:
          valueType = getMariaDBType(type)
          break
        case RESOURCE_TYPE.SNOWFLAKE:
          valueType = getSnowflakeType(type)
          break
        case RESOURCE_TYPE.MSSQL:
          valueType = getMsresourceType(type)
          break
      }
      const selectOptions = getSelectValue(valueType)
      return {
        valueType,
        value: selectOptions?.defaultValue,
        label: selectOptions?.options.find(
          ({ value }) => value === selectOptions?.defaultValue,
        )?.label,
      }
    },
    [getSelectValue],
  )
  return {
    getSelectValue,
    getInputType,
  }
}
