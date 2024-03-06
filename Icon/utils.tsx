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
import ILLADriveIcon from "./actionIcons/illaDrive"
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
import AudioIcon from "./componentIcons/audio.svg?react"
import AvatarIcon from "./componentIcons/avatar.svg?react"
import BarProgressIcon from "./componentIcons/barProgress.svg?react"
import ButtonIcon from "./componentIcons/button.svg?react"
import CanvasIcon from "./componentIcons/canvas.svg?react"
import CarouselIcon from "./componentIcons/carousel.svg?react"
import CascaderIcon from "./componentIcons/cascader.svg?react"
import ChartIcon from "./componentIcons/chart.svg?react"
import ChatIcon from "./componentIcons/chat.svg?react"
import CheckboxIcon from "./componentIcons/checkBox.svg?react"
import CodeScannerWidgetIcon from "./componentIcons/codeScanner.svg?react"
import ContainerIcon from "./componentIcons/container.svg?react"
import CycleProgressIcon from "./componentIcons/cycleProgress.svg?react"
import DateIcon from "./componentIcons/date.svg?react"
import DateRangeIcon from "./componentIcons/dateRange.svg?react"
import DateTimeIcon from "./componentIcons/dateTime.svg?react"
import DividerIcon from "./componentIcons/divider.svg?react"
import DrivePickerIcon from "./componentIcons/drivePicker.svg?react"
import EditableTextIcon from "./componentIcons/editableText.svg?react"
import EventCalendarIcon from "./componentIcons/eventCalendar.svg?react"
import FormIcon from "./componentIcons/form.svg?react"
import GridListIcon from "./componentIcons/gridList.svg?react"
import IconIcon from "./componentIcons/icon.svg?react"
import IFrameIcon from "./componentIcons/iframe.svg?react"
import ImageIcon from "./componentIcons/image.svg?react"
import InputIcon from "./componentIcons/input.svg?react"
import JsonEditorIcon from "./componentIcons/jsonEditor.svg?react"
import JsonSchemaIcon from "./componentIcons/jsonSchema.svg?react"
import ListIcon from "./componentIcons/list.svg?react"
import MapIcon from "./componentIcons/map.svg?react"
import MenuIcon from "./componentIcons/menu.svg?react"
import ModalIcon from "./componentIcons/modal.svg?react"
import MultiSelectIcon from "./componentIcons/multiSelect.svg?react"
import NumberInputIcon from "./componentIcons/numberInput.svg?react"
import PdfIcon from "./componentIcons/pdf.svg?react"
import QrCodeWidgetIcon from "./componentIcons/qrCode.svg?react"
import RadioButtonIcon from "./componentIcons/radioButton.svg?react"
import RadioGroupIcon from "./componentIcons/radioGroup.svg?react"
import RangeSliderIcon from "./componentIcons/rangeSlider.svg?react"
import RateIcon from "./componentIcons/rate.svg?react"
import RecordingIcon from "./componentIcons/recording.svg?react"
import RichtextIcon from "./componentIcons/richText.svg?react"
import SelectIcon from "./componentIcons/select.svg?react"
import SignatureWidgetIcon from "./componentIcons/signature.svg?react"
import SliderIcon from "./componentIcons/slider.svg?react"
import StatisticIcon from "./componentIcons/statistic.svg?react"
import StepIcon from "./componentIcons/step.svg?react"
import SwitchIcon from "./componentIcons/switch.svg?react"
import SwitchGroupIcon from "./componentIcons/switchGroup.svg?react"
import TableIcon from "./componentIcons/table.svg?react"
import TabsIcon from "./componentIcons/tabs.svg?react"
import TagsIcon from "./componentIcons/tags.svg?react"
import TextIcon from "./componentIcons/text.svg?react"
import TextareaIcon from "./componentIcons/textAreaInput.svg?react"
import TimeLineIcon from "./componentIcons/timeLine.svg?react"
import TimePickerIcon from "./componentIcons/timePicker.svg?react"
import TimeRangeIcon from "./componentIcons/timeRange.svg?react"
import UploadIcon from "./componentIcons/upload.svg?react"
import VideoIcon from "./componentIcons/video.svg?react"

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
    case "oracle9i":
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
    case "illadrive":
      return <ILLADriveIcon size={size} />
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
    case "CHECKBOX_GROUP_WIDGET":
      return <CheckboxIcon width={size} height={size} />
    case "CONTAINER_WIDGET":
      return <ContainerIcon width={size} height={size} />
    case "CIRCLE_PROGRESS_WIDGET":
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
    case "JSON_SCHEMA_FORM_WIDGET":
      return <JsonSchemaIcon width={size} height={size} />
    case "LIST_WIDGET":
      return <ListIcon width={size} height={size} />
    case "MAP_WIDGET":
      return <MapIcon width={size} height={size} />
    case "MENU_WIDGET":
      return <MenuIcon width={size} height={size} />
    case "MODAL_WIDGET":
      return <ModalIcon width={size} height={size} />
    case "MULTISELECT_WIDGET":
      return <MultiSelectIcon width={size} height={size} />
    case "NUMBER_INPUT_WIDGET":
      return <NumberInputIcon width={size} height={size} />
    case "PDF_WIDGET":
      return <PdfIcon width={size} height={size} />
    case "RADIO_GROUP_WIDGET":
      return <RadioGroupIcon width={size} height={size} />
    case "RADIO_BUTTON_WIDGET":
      return <RadioButtonIcon width={size} height={size} />
    case "RANGE_SLIDER_WIDGET":
      return <RangeSliderIcon width={size} height={size} />
    case "RATE_WIDGET":
      return <RateIcon width={size} height={size} />
    case "RECORDING_WIDGET":
      return <RecordingIcon width={size} height={size} />
    case "RICH_TEXT_WIDGET":
      return <RichtextIcon width={size} height={size} />
    case "SELECT_WIDGET":
      return <SelectIcon width={size} height={size} />
    case "SLIDER_WIDGET":
      return <SliderIcon width={size} height={size} />
    case "STATISTIC_WIDGET":
      return <StatisticIcon width={size} height={size} />
    case "STEPS_WIDGET":
      return <StepIcon width={size} height={size} />
    case "SWITCH_WIDGET":
      return <SwitchIcon width={size} height={size} />
    case "SWITCH_GROUP_WIDGET":
      return <SwitchGroupIcon width={size} height={size} />
    case "DATA_GRID_WIDGET":
    case "TABLE_WIDGET":
      return <TableIcon width={size} height={size} />
    case "TABS_WIDGET":
      return <TabsIcon width={size} height={size} />
    case "TEXT_WIDGET":
      return <TextIcon width={size} height={size} />
    case "TEXTAREA_INPUT_WIDGET":
      return <TextareaIcon width={size} height={size} />
    case "TIME_PICKER_WIDGET":
      return <TimePickerIcon width={size} height={size} />
    case "TIME_RANGE_WIDGET":
      return <TimeRangeIcon width={size} height={size} />
    case "TIMELINE_WIDGET":
      return <TimeLineIcon width={size} height={size} />
    case "UPLOAD_WIDGET":
      return <UploadIcon width={size} height={size} />
    case "VIDEO_WIDGET":
      return <VideoIcon width={size} height={size} />
    case "IFRAME_WIDGET":
      return <IFrameIcon width={size} height={size} />
    case "CANVAS":
      return <CanvasIcon width={size} height={size} />
    case "GRID_LIST_WIDGET":
      return <GridListIcon width={size} height={size} />
    case "AVATAR_WIDGET":
      return <AvatarIcon width={size} height={size} />
    case "TAGS_WIDGET":
      return <TagsIcon width={size} height={size} />
    case "QR_CODE_WIDGET":
      return <QrCodeWidgetIcon width={size} height={size} />
    case "CODE_SCANNER_WIDGET":
      return <CodeScannerWidgetIcon width={size} height={size} />
    case "SIGNATURE_WIDGET":
      return <SignatureWidgetIcon width={size} height={size} />
    default:
      return null
  }
}
