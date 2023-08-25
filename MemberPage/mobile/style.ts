import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const inviteBtnStyle = css`
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 24px;
  width: 200px;
  height: 44px;
  border-radius: 8px;

  & > span {
    font-size: 16px;
  }
`

export const mobileMemberContainerStyle = css`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const mobileTitleStyle = css`
  padding-bottom: 20px;
  font-weight: 600;
  margin: 0;
  color: ${getColor("grayBlue", "02")};
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
`

export const usageCardContainerStyle = css`
  width: 100%;
  padding-bottom: 26px;
`
