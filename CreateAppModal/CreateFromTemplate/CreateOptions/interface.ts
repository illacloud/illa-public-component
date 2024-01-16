import { CreateFromTemplateProps } from "../interface"

export type CreateOptionsProps = Pick<
  CreateFromTemplateProps,
  "closeModal" | "handleCreateBlankApp" | "handleCreateFromResource"
> & { isInModal?: boolean }
