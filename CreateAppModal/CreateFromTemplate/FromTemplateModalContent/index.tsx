import { ProductMarketApp } from "@illa-public/market-app"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Modal } from "@illa-design/react"
import { FetchTemplateListParams, fetchTemplateList } from "../../service"
import { CreateFromTemplateProps } from "../interface"
import TemplateContent from "./TemplateContent"
import TemplateHeader from "./TemplateHeader"
import TemplateMenu from "./TemplateMenu"
import { templateContainerStyle } from "./style"

const FromTemplateModalContent: FC<CreateFromTemplateProps> = (props) => {
  const { visible, closeModal, afterClose } = props
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
  return (
    <Modal
      w="896px"
      visible={visible}
      footer={false}
      closable
      withoutPadding
      onCancel={closeModal}
      afterClose={afterClose}
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
        />
      </div>
    </Modal>
  )
}

export default FromTemplateModalContent
