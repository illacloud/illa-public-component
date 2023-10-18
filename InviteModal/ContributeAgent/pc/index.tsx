import { FC, useState } from "react"
import { Modal, getColor } from "@illa-design/react"
import { TagControllerPC } from "../../component/TagController/pc"
import { ContributeAgentProps } from "../interface"
import { contributeAgentWithHashtags, updateAgentContribute } from "../service"


export const ContributeAgentPC: FC<ContributeAgentProps> = (props) => {
  const [contributeLoading, setContributeLoading] = useState(false)
  const [currentHashtags, setCurrentHashtags] = useState<string[]>([])

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
      okText={"Contribute"}
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
      title={"Contribute to community"}
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