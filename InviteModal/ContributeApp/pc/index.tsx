import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal, getColor } from "@illa-design/react"
import { TagControllerPC } from "../../component/TagController/pc"
import { ContributeAppProps } from "../interface"
import { contributeAppWithHashtags, updateAppContribute } from "../service"


export const ContributeAppPC: FC<ContributeAppProps> = (props) => {
  const [contributeLoading, setContributeLoading] = useState(false)
  const [currentHashtags, setCurrentHashtags] = useState<string[]>([])
  const { t } = useTranslation()

  return (
    <Modal
      withoutLine
      w="498px"
      closable={true}
      onCancel={() => {
        props.onClose?.()
      }}
      maskClosable={false}
      visible={true}
      hideCancel={!props.productContributed}
      okText={
        props.productContributed
          ? t("contribute.update_modal_button")
          : t("contribute.first_time_modal.button")
      }
      onOk={async () => {
        setContributeLoading(true)
        try {
          if (props.productContributed) {
            await updateAppContribute(
              props.teamID,
              props.productID,
              currentHashtags,
            )
          } else {
            await contributeAppWithHashtags(
              props.teamID,
              props.productID,
              currentHashtags,
            )
          }
          props.onClose?.()
          props.onContributed?.(true)
        } finally {
          setContributeLoading(false)
        }
      }}
      okButtonProps={{
        colorScheme: getColor("grayBlue", "02"),
        disabled: currentHashtags.length === 0,
        loading: contributeLoading,
      }}
      title={
        props.productContributed
          ? t("contribute.update_modal.title")
          : t("contribute.first_time_modal.title")
      }
    >
      <TagControllerPC
        productID={props.productID}
        productType={props.productType}
        productContributed={props.productContributed}
        onTagChange={(tags) => {
          setCurrentHashtags(tags)
        }}
      />
    </Modal>
  )
}

ContributeAppPC.displayName = "ContributeAppPC"