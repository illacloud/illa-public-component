import { CreateFromTemplateProps } from "../interface"

export type CreateOptionsProps = Pick<
  CreateFromTemplateProps,
  "closeModal" | "handleCreateBlankApp"
> & {
  isInModal?: boolean
  handleOpenCreateFromResource?: () => void
}
