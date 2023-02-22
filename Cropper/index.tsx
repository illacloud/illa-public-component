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
import { ReactComponent as RotateRightIcon } from "@/illa-public-component/Cropper/assets/rotate-right.svg"
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

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.setAttribute("crossOrigin", "anonymous") // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
): Promise<Blob | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  )

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
  )

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0)

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
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
const FILE_INIT_ASPECT = 1
const FILE_INIT_CROP = { x: 0, y: 0 }
const FILE_INIT_ROTATION = 0
const FILE_INIT_ZOOM = 1
const FILE_INIT_CROP_SIZE = { width: 120, height: 120 }
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
    const { width, height } = mediaSize
    const ratioWidth = height * FILE_INIT_ASPECT

    setTimeout(() => {
      setRotation(360)
    }, 200)
    // if (width > ratioWidth) {
    //   setCropSize({ width: ratioWidth, height })
    // } else {
    //   setCropSize({ width, height: width / FILE_INIT_ASPECT })
    // }
  }

  const handleCrop = async () => {
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
          height: pxToRem(653),
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
    </div>
  )
}
