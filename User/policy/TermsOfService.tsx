import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import TermsOfServiceUS from "@/illa-public-component/User/policy/en-US/terms-of-serivce.mdx"
import TermsOfServiceJP from "@/illa-public-component/User/policy/ja-JP/terms-of-serivce.mdx"
import TermsOfServiceKR from "@/illa-public-component/User/policy/ko-KR/terms-of-serivce.mdx"
import { policyContainer } from "@/illa-public-component/User/policy/style"
import TermsOfServiceCN from "@/illa-public-component/User/policy/zh-CN/terms-of-serivce.mdx"

const TermsOfService = () => {
  const { i18n, t } = useTranslation()
  const localLanguage = i18n.language

  const ReturnedComponent = useMemo(() => {
    if (localLanguage === "en-US") {
      return <TermsOfServiceUS />
    } else if (localLanguage === "zh-CN") {
      return <TermsOfServiceCN />
    } else if (localLanguage === "ja-JP") {
      return <TermsOfServiceJP />
    } else if (localLanguage === "ko-KR") {
      return <TermsOfServiceKR />
    }
  }, [localLanguage])

  return (
    <div css={policyContainer}>
      <Helmet>
        <title>{t("policy.terms.title")}</title>
        <meta name="description" content={t("policy.terms.description")} />
      </Helmet>
      {ReturnedComponent}
    </div>
  )
}

export default TermsOfService
