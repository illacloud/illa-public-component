import { ReactNode } from "react"
import AIAgentIcon from "./actionIcons/aiAgent"
import AirtableIcon from "./actionIcons/airtable"
import AppwriteIcon from "./actionIcons/appwrite"
import ClickhouseIcon from "./actionIcons/clickhouse"
import CouchDBIcon from "./actionIcons/couchdb"
import HydraIcon from "./actionIcons/dydra"
import DynamoIcon from "./actionIcons/dynamo"
import ElasticIcon from "./actionIcons/elastic"
import FirebaseIcon from "./actionIcons/firebase"
import GlobalDataIcon from "./actionIcons/globalData"
import GoogleSheetIcon from "./actionIcons/googlesheets"
import GraphQLIcon from "./actionIcons/graphql"
import HuggingFaceIcon from "./actionIcons/huggingface"
import MariaDbIcon from "./actionIcons/mariadb"
import MicrosoftSqlIcon from "./actionIcons/microsoftsql"
import MongoDbIcon from "./actionIcons/mongodb"
import MySqlIcon from "./actionIcons/mysql"
import NeonIcon from "./actionIcons/neon"
import OracleDBIcon from "./actionIcons/oracle"
import PostgreSqlIcon from "./actionIcons/postgresql"
import RedisIcon from "./actionIcons/redis"
import RestApiIcon from "./actionIcons/restapi"
import S3Icon from "./actionIcons/s3"
import SmtpIcon from "./actionIcons/smtp"
import SnowflakeIcon from "./actionIcons/snowflake"
import SupabaseIcon from "./actionIcons/supabase"
import TidbIcon from "./actionIcons/tidb"
import TransformerIcon from "./actionIcons/transformer"
import UpstashIcon from "./actionIcons/upstash"
import { ReactComponent as AudioIcon } from "./componentIcons/audio.svg"
import { ReactComponent as BarProgressIcon } from "./componentIcons/barProgress.svg"
import { ReactComponent as ButtonIcon } from "./componentIcons/button.svg"
import { ReactComponent as CanvasIcon } from "./componentIcons/canvas.svg"
import { ReactComponent as CarouselIcon } from "./componentIcons/carousel.svg"
import { ReactComponent as CascaderIcon } from "./componentIcons/cascader.svg"
import { ReactComponent as ChartIcon } from "./componentIcons/chart.svg"
import { ReactComponent as ChatIcon } from "./componentIcons/chat.svg"
import { ReactComponent as CheckboxIcon } from "./componentIcons/checkBox.svg"
import { ReactComponent as ContainerIcon } from "./componentIcons/container.svg"
import { ReactComponent as CycleProgressIcon } from "./componentIcons/cycleProgress.svg"
import { ReactComponent as DateIcon } from "./componentIcons/date.svg"
import { ReactComponent as DateRangeIcon } from "./componentIcons/dateRange.svg"
import { ReactComponent as DateTimeIcon } from "./componentIcons/dateTime.svg"
import { ReactComponent as DividerIcon } from "./componentIcons/divider.svg"
import { ReactComponent as DrivePickerIcon } from "./componentIcons/drivePicker.svg"
import { ReactComponent as EditableTextIcon } from "./componentIcons/editableText.svg"
import { ReactComponent as EventCalendarIcon } from "./componentIcons/eventCalendar.svg"
import { ReactComponent as FormIcon } from "./componentIcons/form.svg"
import { ReactComponent as IconIcon } from "./componentIcons/icon.svg"
import { ReactComponent as ImageIcon } from "./componentIcons/image.svg"
import { ReactComponent as InputIcon } from "./componentIcons/input.svg"
import { ReactComponent as JsonEditorIcon } from "./componentIcons/jsonEditor.svg"
import { ReactComponent as JsonSchemaIcon } from "./componentIcons/jsonSchema.svg"
import { ReactComponent as ListIcon } from "./componentIcons/list.svg"
import { ReactComponent as MapIcon } from "./componentIcons/map.svg"
import { ReactComponent as MenuIcon } from "./componentIcons/menu.svg"
import { ReactComponent as ModalIcon } from "./componentIcons/modal.svg"
import { ReactComponent as MultiSelectIcon } from "./componentIcons/multiSelect.svg"
import { ReactComponent as NumberInputIcon } from "./componentIcons/numberInput.svg"
import { ReactComponent as PdfIcon } from "./componentIcons/pdf.svg"
import { ReactComponent as RadioIcon } from "./componentIcons/radioButton.svg"
import { ReactComponent as RadioGroupIcon } from "./componentIcons/radioGroup.svg"
import { ReactComponent as RangeSliderIcon } from "./componentIcons/rangeSlider.svg"
import { ReactComponent as RateIcon } from "./componentIcons/rate.svg"
import { ReactComponent as RecordingIcon } from "./componentIcons/recording.svg"
import { ReactComponent as RichtextIcon } from "./componentIcons/richText.svg"
import { ReactComponent as SelectIcon } from "./componentIcons/select.svg"
import { ReactComponent as SliderIcon } from "./componentIcons/slider.svg"
import { ReactComponent as StatisticIcon } from "./componentIcons/statistic.svg"
import { ReactComponent as StepIcon } from "./componentIcons/step.svg"
import { ReactComponent as SwitchIcon } from "./componentIcons/switch.svg"
import { ReactComponent as SwitchGroupIcon } from "./componentIcons/switchGroup.svg"
import { ReactComponent as TableIcon } from "./componentIcons/table.svg"
import { ReactComponent as TabsIcon } from "./componentIcons/tabs.svg"
import { ReactComponent as TextIcon } from "./componentIcons/text.svg"
import { ReactComponent as TextareaIcon } from "./componentIcons/textAreaInput.svg"
import { ReactComponent as TimeLineIcon } from "./componentIcons/timeLine.svg"
import { ReactComponent as TimePickerIcon } from "./componentIcons/timePicker.svg"
import { ReactComponent as TimeRangeIcon } from "./componentIcons/timeRange.svg"
import { ReactComponent as UploadIcon } from "./componentIcons/upload.svg"
import { ReactComponent as VideoIcon } from "./componentIcons/video.svg"

export function getIconFromResourceType(
  type: string,
  size: string,
): ReactNode | null {
  switch (type) {
    case "supabasedb":
      return <SupabaseIcon size={size} />
    case "graphql":
      return <GraphQLIcon size={size} />
    case "elasticsearch":
      return <ElasticIcon size={size} />
    case "dynamodb":
      return <DynamoIcon size={size} />
    case "snowflake":
      return <SnowflakeIcon size={size} />
    case "smtp":
      return <SmtpIcon size={size} />
    case "googlesheets":
      return <GoogleSheetIcon size={size} />
    case "hfendpoint":
    case "huggingface":
      return <HuggingFaceIcon size={size} />
    case "transformer":
      return <TransformerIcon size={size} />
    case "mariadb":
      return <MariaDbIcon size={size} />
    case "tidb":
      return <TidbIcon size={size} />
    case "neon":
      return <NeonIcon size={size} />
    case "s3":
      return <S3Icon size={size} />
    case "mysql":
      return <MySqlIcon size={size} />
    case "mssql":
      return <MicrosoftSqlIcon size={size} />
    case "restapi":
      return <RestApiIcon size={size} />
    case "mongodb":
      return <MongoDbIcon size={size} />
    case "redis":
      return <RedisIcon size={size} />
    case "upstash":
      return <UpstashIcon size={size} />
    case "hydra":
      return <HydraIcon size={size} />
    case "postgresql":
      return <PostgreSqlIcon size={size} />
    case "firebase":
      return <FirebaseIcon size={size} />
    case "clickhouse":
      return <ClickhouseIcon size={size} />
    case "couchdb":
      return <CouchDBIcon size={size} />
    case "oracle":
      return <OracleDBIcon size={size} />
    case "appwrite":
      return <AppwriteIcon size={size} />
    case "airtable":
      return <AirtableIcon size={size} />
    case "aiagent":
      return <AIAgentIcon size={size} />
    case "globalData":
      return <GlobalDataIcon size={size} />
  }
  return null
}

export function getIconFromWidgetType(widgetType: string, size: string) {
  switch (widgetType) {
    case "AUDIO_WIDGET":
      return <AudioIcon width={size} height={size} />
    case "BAR_PROGRESS_WIDGET":
      return <BarProgressIcon width={size} height={size} />
    case "BUTTON_WIDGET":
      return <ButtonIcon width={size} height={size} />
    case "CAROUSEL_WIDGET":
      return <CarouselIcon width={size} height={size} />
    case "CASCADER_WIDGET":
      return <CascaderIcon width={size} height={size} />
    case "CHART_WIDGET":
      return <ChartIcon width={size} height={size} />
    case "CHAT_WIDGET":
      return <ChatIcon width={size} height={size} />
    case "CHECKBOX_WIDGET":
      return <CheckboxIcon width={size} height={size} />
    case "CONTAINER_WIDGET":
      return <ContainerIcon width={size} height={size} />
    case "CYCLE_PROGRESS_WIDGET":
      return <CycleProgressIcon width={size} height={size} />
    case "DATE_WIDGET":
      return <DateIcon width={size} height={size} />
    case "DATE_RANGE_WIDGET":
      return <DateRangeIcon width={size} height={size} />
    case "DATE_TIME_WIDGET":
      return <DateTimeIcon width={size} height={size} />
    case "DIVIDER_WIDGET":
      return <DividerIcon width={size} height={size} />
    case "DRIVE_PICKER_WIDGET":
      return <DrivePickerIcon width={size} height={size} />
    case "EDITABLE_TEXT_WIDGET":
      return <EditableTextIcon width={size} height={size} />
    case "EVENT_CALENDAR_WIDGET":
      return <EventCalendarIcon width={size} height={size} />
    case "FORM_WIDGET":
      return <FormIcon width={size} height={size} />
    case "ICON_WIDGET":
      return <IconIcon width={size} height={size} />
    case "IMAGE_WIDGET":
      return <ImageIcon width={size} height={size} />
    case "INPUT_WIDGET":
      return <InputIcon width={size} height={size} />
    case "JSON_EDITOR_WIDGET":
      return <JsonEditorIcon width={size} height={size} />
    case "JSON_SCHEMA_WIDGET":
      return <JsonSchemaIcon width={size} height={size} />
    case "LIST_WIDGET":
      return <ListIcon width={size} height={size} />
    case "MAP_WIDGET":
      return <MapIcon width={size} height={size} />
    case "MENU_WIDGET":
      return <MenuIcon width={size} height={size} />
    case "MODAL_WIDGET":
      return <ModalIcon width={size} height={size} />
    case "MULTI_SELECT_WIDGET":
      return <MultiSelectIcon width={size} height={size} />
    case "NUMBER_INPUT_WIDGET":
      return <NumberInputIcon width={size} height={size} />
    case "PDF_WIDGET":
      return <PdfIcon width={size} height={size} />
    case "RADIO_GROUP_WIDGET":
      return <RadioGroupIcon width={size} height={size} />
    case "RADIO_WIDGET":
      return <RadioIcon width={size} height={size} />
    case "RANGE_SLIDER_WIDGET":
      return <RangeSliderIcon width={size} height={size} />
    case "RATE_WIDGET":
      return <RateIcon width={size} height={size} />
    case "RECORDING_WIDGET":
      return <RecordingIcon width={size} height={size} />
    case "RICH_TEXT_EDITOR_WIDGET":
      return <RichtextIcon width={size} height={size} />
    case "SELECT_WIDGET":
      return <SelectIcon width={size} height={size} />
    case "SLIDER_WIDGET":
      return <SliderIcon width={size} height={size} />
    case "STATS_WIDGET":
      return <StatisticIcon width={size} height={size} />
    case "STEP_WIDGET":
      return <StepIcon width={size} height={size} />
    case "SWITCH_WIDGET":
      return <SwitchIcon width={size} height={size} />
    case "SWITCH_GROUP_WIDGET":
      return <SwitchGroupIcon width={size} height={size} />
    case "TABLE_WIDGET":
      return <TableIcon width={size} height={size} />
    case "TABS_WIDGET":
      return <TabsIcon width={size} height={size} />
    case "TEXT_WIDGET":
      return <TextIcon width={size} height={size} />
    case "TEXTAREA_WIDGET":
      return <TextareaIcon width={size} height={size} />
    case "TIME_PICKER_WIDGET":
      return <TimePickerIcon width={size} height={size} />
    case "TIME_RANGE_WIDGET":
      return <TimeRangeIcon width={size} height={size} />
    case "TIME_LINE_WIDGET":
      return <TimeLineIcon width={size} height={size} />
    case "UPLOAD_WIDGET":
      return <UploadIcon width={size} height={size} />
    case "VIDEO_WIDGET":
      return <VideoIcon width={size} height={size} />
    case "CANVAS":
      return <CanvasIcon width={size} height={size} />
    default:
      return null
  }
}
