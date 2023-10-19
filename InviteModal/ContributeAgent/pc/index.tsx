import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal, getColor, useMessage } from "@illa-design/react"
import { TagControllerPC } from "../../component/TagController/pc"
import { ContributeAgentProps } from "../interface"
import { contributeAgentWithHashtags, updateAgentContribute } from "../service"

export const ContributeAgentPC: FC<ContributeAgentProps> = (props) => {
  const [contributeLoading, setContributeLoading] = useState(false)
  const [currentHashtags, setCurrentHashtags] = useState<string[]>([])
  const { t } = useTranslation()
  const message = useMessage()

  return (
    <Modal
      withoutLine
      w="498px"
      closable={true}
      onCancel={() => {
        props.onClose?.()
      }}
      maskClosable={false}
      enableOnFormTags={false}
      visible={true}
      hideCancel={!props.productContributed}
      okText={
        props.productContributed
          ? t("contribute.update_modal.button")
          : t("contribute.first_time_modal.button")
      }
      onOk={async () => {
        setContributeLoading(true)
        try {
          if (props.productContributed) {
            await updateAgentContribute(
              props.teamID,
              props.productID,
              currentHashtags,
            )
          } else {
            await contributeAgentWithHashtags(
              props.teamID,
              props.productID,
              currentHashtags,
            )
          }
          props.onContributed?.(true)
          props.onClose?.()
        } catch (e) {
          message.error({
            content: t("user_management.modal.message.make_public_failed"),
          })
        } finally {
          setContributeLoading(false)
        }
      }}
      okButtonProps={{
        colorScheme: getColor("grayBlue", "02"),
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

ContributeAgentPC.displayName = "ContributeAgentPC"
