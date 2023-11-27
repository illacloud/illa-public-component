import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import {
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import EasyCropper, { Area } from "react-easy-crop"
import { useTranslation } from "react-i18next"
import { Button, CloseIcon, Modal, Spin, useMessage } from "@illa-design/react"
import RotateRightIcon from "./assets/rotate-right.svg?react"
import {
  FILE_INIT_ASPECT,
  FILE_INIT_CROP,
  FILE_INIT_CROP_SIZE,
  FILE_INIT_ROTATION,
  FILE_INIT_ZOOM,
  FILE_SIZE_LIMIT,
  MOBILE_FILE_INIT_CROP_SIZE,
} from "./constants"
import { AvatarUploadProps } from "./interface"
import {
  applyZoomStyle,
  closeIconStyle,
  controlContainerStyle,
  controlStyle,
  cropperContainerStyle,
  cropperWrapperStyle,
  loadingStyle,
  mobileButtonStyle,
  mobileCloseIconStyle,
  mobileControlContainerStyle,
  mobileControlStyle,
  mobileCropperContainerStyle,
  mobileModalStyle,
  mobileModalTitleStyle,
  mobileRotateIconStyle,
  modalStyle,
  modalTitleStyle,
  rotateIconStyle,
  rowStyle,
  saveButtonStyle,
} from "./style"
import { getCroppedImg } from "./utils"

export const AvatarUpload: FC<AvatarUploadProps> = (props) => {
  const { isMobile, onOk, children, disabled = false } = props
  const { t } = useTranslation()
  const message = useMessage()
  const inputRef = useRef<HTMLInputElement>(null)
  const controlRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState<string>()
  const [file, setFile] = useState<File | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [crop, setCrop] = useState(FILE_INIT_CROP)
  const [cropSize, setCropSize] = useState(
    isMobile ? MOBILE_FILE_INIT_CROP_SIZE : FILE_INIT_CROP_SIZE,
  )
  const [zoom, setZoom] = useState(FILE_INIT_ZOOM)
  const [rotation, setRotation] = useState(FILE_INIT_ROTATION)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()
  const { track } = useContext(MixpanelTrackContext)

  const resetCrop = () => {
    setZoom(FILE_INIT_ZOOM)
    setCrop(FILE_INIT_CROP)
    setRotation(FILE_INIT_ROTATION)
  }

  const onCloseModal = () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "avater_crop_close",
      },
      "team_id",
    )
    setModalVisible(false)
    setFile(null)
    inputRef.current && (inputRef.current.value = "")
    resetCrop()
  }

  const handleClick = () => {
    inputRef.current && inputRef.current.click()
  }

  const handleUploadFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]
      // file size limit
      if (file.size >= FILE_SIZE_LIMIT) {
        message.error({ content: t("image_exceed") })
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.VALIDATE,
          {
            element: "avater_crop_save",
            parameter1: Math.floor(file.size / 1024),
            parameter2: "failed",
          },
          "team_id",
        )
        return
      }
      setUrl(URL.createObjectURL(file))
      setFile(file)
      setModalVisible(true)
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.VALIDATE,
        {
          element: "avater_crop_save",
          parameter1: Math.floor(file.size / 1024),
          parameter2: "suc",
        },
        "team_id",
      )
    }
    e.target.value = ""
  }

  const handleZoom = (e: ChangeEvent<HTMLInputElement>) => {
    const zoom = e.target.valueAsNumber
    setZoom(zoom)
  }

  const onMediaLoaded = () => {
    setTimeout(() => {
      setRotation(360)
    }, 200)
  }

  const handleCrop = async () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "avater_crop_save",
      },
      "team_id",
    )
    if (loading || !file || !croppedAreaPixels) return
    setLoading(true)
    const blob = await getCroppedImg(url || "", croppedAreaPixels, rotation)
    if (blob) {
      const newFile = new File([blob], file.name || "image", {
        type: file.type || "image/*",
      })
      const res = await onOk(newFile)
      if (res) {
        onCloseModal()
      }
    } else {
      console.error("Cropped Img is null")
      message.error({
        content: t("profile.setting.message.save_fail"),
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (modalVisible) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "avater_crop",
        },
        "team_id",
      )
    }
  }, [modalVisible, track])

  const [
    applyModalStyle,
    applyModalTitleStyle,
    applyCropperContainerStyle,
    applyControlContainerStyle,
    applyControlStyle,
    rotateStyle,
    closeStyle,
    buttonStyle,
  ] = useMemo(() => {
    if (isMobile)
      return [
        mobileModalStyle,
        mobileModalTitleStyle,
        mobileCropperContainerStyle,
        mobileControlContainerStyle,
        mobileControlStyle,
        mobileRotateIconStyle,
        mobileCloseIconStyle,
        mobileButtonStyle,
      ]
    return [
      modalStyle,
      modalTitleStyle,
      cropperContainerStyle,
      controlContainerStyle,
      controlStyle,
      rotateIconStyle,
      closeIconStyle,
      saveButtonStyle,
    ]
  }, [isMobile])

  const cropperStyle = useMemo(() => {
    if (isMobile) {
      return {
        containerStyle: {
          width: "100%",
          height: "653rem",
        },
        mediaStyle: {
          height: "653rem",
        },
      }
    }
    return {
      containerStyle: {
        width: "100%",
        height: 260,
      },
      mediaStyle: {
        height: 260,
      },
    }
  }, [isMobile])

  return (
    <>
      <div css={cropperWrapperStyle(disabled)} onClick={handleClick}>
        {children}
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleUploadFileChange}
          disabled={disabled}
        />
      </div>
      {file && (
        <Modal
          _css={applyModalStyle}
          visible={modalVisible}
          withoutPadding
          onCancel={onCloseModal}
          maskClosable={false}
          footer={false}
        >
          <Spin _css={loadingStyle} loading={loading} colorScheme="techPurple">
            <span css={applyModalTitleStyle}>
              {t("image.crop.modal.title")}
            </span>
            <CloseIcon css={closeStyle} onClick={onCloseModal} />
            <div css={applyCropperContainerStyle}>
              <EasyCropper
                restrictPosition
                cropSize={cropSize}
                setCropSize={setCropSize}
                style={cropperStyle}
                objectFit={"vertical-cover"}
                aspect={FILE_INIT_ASPECT}
                cropShape={"round"}
                image={url}
                crop={crop}
                minZoom={0.5}
                maxZoom={3}
                zoom={zoom}
                zoomSpeed={0.01}
                rotation={rotation}
                showGrid={false}
                onCropComplete={(_, croppedAreaPixels) => {
                  setCroppedAreaPixels(croppedAreaPixels)
                }}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onMediaLoaded={onMediaLoaded}
              />
            </div>
            <div css={applyControlContainerStyle}>
              <div css={rowStyle}>
                <input
                  ref={controlRef}
                  css={[applyControlStyle, applyZoomStyle(zoom)]}
                  type="range"
                  value={zoom}
                  min={0.5}
                  max={3}
                  step={0.01}
                  aria-labelledby="Zoom"
                  onChange={handleZoom}
                  className="zoom-range"
                />
                <RotateRightIcon
                  css={rotateStyle}
                  onClick={() => setRotation(rotation + 90)}
                />
              </div>
              <Button
                _css={buttonStyle}
                colorScheme="techPurple"
                onClick={handleCrop}
              >
                {t("image.crop.modal.save")}
              </Button>
            </div>
          </Spin>
        </Modal>
      )}
    </>
  )
}
