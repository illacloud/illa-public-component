import { Button, CloseIcon, Modal, Spin, useMessage } from "@illa-design/react"
import {
  ChangeEvent,
  FC,
  HTMLAttributes,
  useMemo,
  useRef,
  useState,
} from "react"
import EasyCropper, { Area, MediaSize } from "react-easy-crop"
import { useTranslation } from "react-i18next"
import { ReactComponent as RotateRightIcon } from "@/assets/icon/rotate-right.svg"
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
} from "@/illa-public-component/Cropper/style"
import { pxToRem } from "@/style"

async function _getCroppedImg(
  url: string,
  pixelCrop?: Area,
  rotation = 0,
): Promise<Blob | null> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.src = url
  })
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx || !image) {
    return null
  }

  const imageSize =
    2 * ((Math.max(image.width, image.height) / 2) * Math.sqrt(2))
  canvas.width = imageSize
  canvas.height = imageSize

  if (rotation) {
    ctx.translate(imageSize / 2, imageSize / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.translate(-imageSize / 2, -imageSize / 2)
  }

  ctx.drawImage(
    image,
    imageSize / 2 - image.width / 2,
    imageSize / 2 - image.height / 2,
  )
  const data = ctx.getImageData(0, 0, imageSize, imageSize)
  if (pixelCrop) {
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    ctx.putImageData(
      data,
      Math.round(0 - imageSize / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - imageSize / 2 + image.height * 0.5 - pixelCrop.y),
    )
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    })
  })
}

interface AvatarUploadProps extends HTMLAttributes<HTMLDivElement> {
  onOk: (blob: Blob) => Promise<boolean>
  isMobile?: boolean
}

// 500KB
const FILE_SIZE_LIMIT = 1024 * 500
const FILE_INIT_CROP = { x: 0, y: 0 }
const FILE_INIT_ROTATION = 0
const FILE_INIT_ZOOM = 1
const FILE_INIT_CROP_SIZE = { width: 200, height: 200 }
const MOBILE_FILE_INIT_CROP_SIZE = { width: 200, height: 200 }

export const AvatarUpload: FC<AvatarUploadProps> = (props) => {
  const { isMobile, onOk, children, ...otherProps } = props
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

  const resetCrop = () => {
    setZoom(FILE_INIT_ZOOM)
    setCrop(FILE_INIT_CROP)
    setRotation(FILE_INIT_ROTATION)
  }

  const onCloseModal = () => {
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
        e.target.value = ""
        return
      }
      setUrl(URL.createObjectURL(file))
      setFile(file)
      setModalVisible(true)
    }
  }

  const handleZoom = (e: ChangeEvent<HTMLInputElement>) => {
    const zoom = e.target.valueAsNumber
    setZoom(zoom)
  }

  const onMediaLoaded = (mediaSize: MediaSize) => {
    const { height: mediaHeight } = mediaSize
    setCropSize((prev) => {
      const { height } = prev
      if (mediaHeight > height) {
        return {
          width: mediaHeight,
          height: mediaHeight,
        }
      }
      return prev
    })
  }

  const handleCrop = async () => {
    if (loading || !file) return
    setLoading(true)
    const blob = await _getCroppedImg(url || "", croppedAreaPixels, rotation)
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
          height: pxToRem(653),
        },
        mediaStyle: {
          height: pxToRem(404),
        },
      }
    }
    return {
      containerStyle: {
        width: "100%",
        height: 260,
      },
      mediaStyle: {
        height: 120,
      },
    }
  }, [isMobile])

  return (
    <div {...otherProps}>
      <div css={cropperWrapperStyle} onClick={handleClick}>
        {children}
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type={"file"}
          accept=".jpg, .jpeg, .png"
          onChange={handleUploadFileChange}
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
                restrictPosition={false}
                cropSize={cropSize}
                setCropSize={setCropSize}
                style={cropperStyle}
                objectFit={"vertical-cover"}
                aspect={1}
                cropShape={"round"}
                image={url}
                crop={crop}
                minZoom={1}
                maxZoom={3}
                zoom={zoom}
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
                  min={1}
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
    </div>
  )
}
