import { ProductMarketApp } from "@illa-public/market-app"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Modal } from "@illa-design/react"
import { FetchTemplateListParams, fetchTemplateList } from "../service"
import TemplateContent from "./TemplateContent"
import TemplateHeader from "./TemplateHeader"
import TemplateMenu from "./TemplateMenu"
import { CreateFromTemplateProps } from "./interface"
import { templateContainerStyle } from "./style"

export const CreateFromTemplateModal: FC<CreateFromTemplateProps> = (props) => {
  const { closeModal, prevContentNode } = props
  const [loading, setLoading] = useState(false)
  const [templateList, setTemplateList] = useState<ProductMarketApp[]>([])
  const [menuItems, setMenuItems] = useState<string[]>([])
  const cacheSearch = useRef<string | undefined>()
  const cacheMenu = useRef<string | undefined>()

  const getTemplateList = useCallback(
    async (
      params: FetchTemplateListParams,
      needSetMenu: boolean,
      signal?: AbortSignal,
    ) => {
      try {
        setLoading(true)
        const { data } = await fetchTemplateList(params, signal)
        setTemplateList(data.products)
        needSetMenu && setMenuItems(data.recommendHashtags)
      } catch (e) {
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    const controller = new AbortController()
    getTemplateList({}, true, controller.signal)
    return () => {
      controller.abort()
    }
  }, [getTemplateList])

  return createPortal(
    <Modal
      w="896px"
      visible
      footer={false}
      closable
      withoutPadding
      onCancel={closeModal}
    >
      <TemplateHeader
        closeModal={closeModal}
        onSearch={(search?: string) => {
          cacheSearch.current = search
          getTemplateList({ search, hashtags: cacheMenu.current }, false)
        }}
      />
      <div css={templateContainerStyle}>
        <TemplateMenu
          menuItems={menuItems}
          onMenuClick={(tag?: string) => {
            cacheMenu.current = tag
            getTemplateList(
              { hashtags: tag, search: cacheSearch.current },
              false,
            )
          }}
        />
        <TemplateContent
          {...props}
          loading={loading}
          templateList={templateList}
          prevContentNode={prevContentNode}
        />
      </div>
    </Modal>,
    document.body,
  )
}

export default CreateFromTemplateModal
