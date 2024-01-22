import { debounce } from "lodash-es"
import { FC, useRef } from "react"
import { CloseIcon, Search } from "@illa-design/react"
import {
  headerContainerStyle,
  modalCloseIconStyle,
  searchContainerStyle,
  titleStyle,
} from "./style"

interface TemplateHeaderProps {
  onSearch: (search?: string) => void
  closeModal?: () => void
}
const TemplateHeader: FC<TemplateHeaderProps> = ({ closeModal, onSearch }) => {
  const handleChangeSearch = useRef(() =>
    debounce((value?: string) => {
      onSearch(value ? value : undefined)
    }, 160),
  )
  return (
    <div css={headerContainerStyle}>
      <div css={titleStyle}>
        <span>ILLA App</span>
        <div css={modalCloseIconStyle} onClick={closeModal}>
          <CloseIcon size="12px" />
        </div>
      </div>
      <div css={searchContainerStyle}>
        <Search
          autoFocus={false}
          w="100%"
          size="large"
          variant="fill"
          placeholder="Search"
          colorScheme="techPurple"
          onChange={handleChangeSearch.current()}
          allowClear
        />
      </div>
    </div>
  )
}
export default TemplateHeader
