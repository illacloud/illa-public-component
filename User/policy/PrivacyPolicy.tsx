import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import PrivacyPolicyUS from "@/illa-public-component/User/policy/en-US/privacy-policy.mdx"
import PrivacyPolicyJP from "@/illa-public-component/User/policy/ja-JP/privacy-policy.mdx"
import PrivacyPolicyKR from "@/illa-public-component/User/policy/ko-KR/privacy-policy.mdx"
import { policyContainer } from "@/illa-public-component/User/policy/style"
import PrivacyPolicyCN from "@/illa-public-component/User/policy/zh-CN/privacy-policy.mdx"

const PrivacyPolicy = () => {
  const { i18n, t } = useTranslation()
  const localLanguage = i18n.language

  const ReturnedComponent = useMemo(() => {
    if (localLanguage === "en-US") {
      return <PrivacyPolicyUS />
    } else if (localLanguage === "zh-CN") {
      return <PrivacyPolicyCN />
    } else if (localLanguage === "ja-JP") {
      return <PrivacyPolicyJP />
    } else if (localLanguage === "ko-KR") {
      return <PrivacyPolicyKR />
    }
  }, [localLanguage])

  return (
    <div css={policyContainer}>
      <Helmet>
        <title>{t("policy.privacy.title")}</title>
        <meta name="description" content={t("policy.privacy.description")} />
      </Helmet>
      {ReturnedComponent}
    </div>
  )
}

export default PrivacyPolicy
