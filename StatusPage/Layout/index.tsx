import { FC } from "react"
import { Helmet } from "react-helmet-async"
import { ErrorPageProps } from "./interface"
import { errorPageStyle } from "./style"

export const ErrorPage: FC<ErrorPageProps> = (props) => {
  const { title, des, img, children } = props
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div css={errorPageStyle}>
        {img}
        <span> {title} </span>
        <span>{des}</span>
        {children}
      </div>
    </>
  )
}
