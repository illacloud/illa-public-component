import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const headerWrapperStyle = css`
  width: 100%;
  padding: 40px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

export const titleStyle = css`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: ${getColor("grayBlue", "02")};
  flex: 0;
  margin: 0;
  white-space: nowrap;
`

export const buttonGroup = css`
  display: flex;
  gap: 8px;
  align-items: center;
`

/**
 * MoreAction Style
 */

export const allowEditorOrViewerInviteWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 32px;
`

/**
 * InviteMemberModalContent Style
 */

export const modalWithMaskWrapperStyle = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const maskStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
  z-index: -1;
`

export const modalWrapperStyle = css`
  background-color: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  width: 486px;
`

export const modalHeaderWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 486px;
`

export const modalTitleStyle = css`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
`

export const modalTabWrapperStyle = css`
  display: flex;
  gap: 16px;
`

export const applyTabLabelStyle = (active: boolean) => css`
  font-size: 14px;
  line-height: 22px;
  font-weight: ${active ? 500 : 400};
  color: ${active ? getColor("grayBlue", "02") : getColor("grayBlue", "03")};
  text-transform: capitalize;
  cursor: pointer;
`

export const closeIconHotSpotStyle = css`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
`

export const modalBodyWrapperStyle = css`
  width: 100%;
  padding: 8px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const appPublicWrapperStyle = css`
  //height: 196px;
  padding: 16px;
`

export const publicLabelStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 27px;
  font-weight: 500;
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
`

export const publicLinkStyle = css`
  margin-top: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const subBodyWrapperStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const subBodyTitleWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`

export const subtitleStyle = css`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
`

export const inviteLinkWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const inviteLinkWhenClosedStyle = css`
  font-size: 12px;
  line-height: 15px;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
`

export const turnOnInviteLinkButtonStyle = css`
  margin-left: 4px;
  cursor: pointer;
  color: ${getColor("techPurple", "01")};
`

export const fakerInputStyle = css`
  width: 378px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
  gap: 8px;
  padding: 4px 16px;
  overflow: hidden;
`
export const fakerInputWithEmail = css`
  ${fakerInputStyle};
  align-items: flex-start;
`

export const initInputTagStyle = css`
  border: unset;
  padding: unset;
  box-shadow: unset;
`

export const emailInputStyle = css`
  width: 378px;
  flex-shrink: 0;

  & > span:first-of-type {
    overflow: hidden;
  }
`

export const urlAreaStyle = (isError: boolean) => css`
  max-width: 280px;
  font-size: 14px;
  color: ${isError ? getColor("red", "03") : getColor("grayBlue", "02")};
  flex: 1;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const inviteEmailWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
`

export const inviteListWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  max-height: 224px;
  overflow-y: auto;
`

export const inviteListTitleWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const avatarAndNameWrapperStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const nicknameStyle = css`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
`

export const settingIconStyle = css`
  cursor: pointer;
`

export const inviteAvatarStyle = css`
  width: 32px;
  height: 32px;
  border: 1px dashed ${getColor("grayBlue", "07")};
  flex: none;
  border-radius: 16px;
`

export const applyHiddenStyle = (isHidden: boolean) => css`
  display: ${isHidden ? "none" : "inherit"};
`
