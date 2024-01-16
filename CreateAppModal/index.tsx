import { FC } from "react"
import CreateFromResource from "./CreateFromResource"
import CreateFromTemplate from "./CreateFromTemplate"

const CreateApp: FC = () => {
  return (
    <>
      <CreateFromResource />
      <CreateFromTemplate />
    </>
  )
}

export default CreateApp
export * from "./interface"
export * from "./CreateFromResource/ModalHandler/hooks"
export * from "./service"
export * from "./CreateFromTemplate/ModalHandler/hooks"
export { AppTemplateCard } from "./CreateFromTemplate/AppTemplateCard"
export { CreateOptions } from "./CreateFromTemplate/CreateOptions"
export { CARD_NORMAL_WIDTH } from "./CreateFromTemplate/AppTemplateCard/constants"
