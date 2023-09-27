import { COLLAR_TYPE } from "../../interface"
import { COLLAR_BUTTON_TEXT, COLLAR_MORE_TEXT } from "./constants"

export const getCurrentCollarType = (
  teamSubscribeNum: number,
  currentSubscribeNum: number,
  isCanceled?: boolean,
) => {
  if (isCanceled) {
    return COLLAR_TYPE.MODIFY_SUBSCRIPTION
  }
  if (teamSubscribeNum === 0) {
    return COLLAR_TYPE.SUBSCRIBE
  } else {
    if (currentSubscribeNum > teamSubscribeNum) {
      return COLLAR_TYPE.ADD_COLLAR
    } else if (currentSubscribeNum === 0) {
      return COLLAR_TYPE.CANCEL_SUBSCRIPTION
    } else if (currentSubscribeNum < teamSubscribeNum) {
      return COLLAR_TYPE.REMOVE_COLLAR
    } else {
      return COLLAR_TYPE.SUBSCRIBE
    }
  }
}

export const getDescription = (currentCollarType: COLLAR_TYPE) => {
  switch (currentCollarType) {
    case COLLAR_TYPE.ADD_COLLAR:
      return COLLAR_MORE_TEXT.ADD_COLLAR
    case COLLAR_TYPE.REMOVE_COLLAR:
      return COLLAR_MORE_TEXT.REMOVE_COLLAR
    case COLLAR_TYPE.CANCEL_SUBSCRIPTION:
      return COLLAR_MORE_TEXT.CANCEL_SUBSCRIPTION
    default:
    case COLLAR_TYPE.SUBSCRIBE:
      return COLLAR_MORE_TEXT.SUBSCRIBE
  }
}

export const getBtnText = (currentCollarType: COLLAR_TYPE) => {
  if (currentCollarType === COLLAR_TYPE.SUBSCRIBE) {
    return COLLAR_BUTTON_TEXT.SUBSCRIBE
  } else if (currentCollarType === COLLAR_TYPE.ADD_COLLAR) {
    return COLLAR_BUTTON_TEXT.ADD_COLLAR
  } else if (currentCollarType === COLLAR_TYPE.REMOVE_COLLAR) {
    return COLLAR_BUTTON_TEXT.REMOVE_COLLAR
  } else if (currentCollarType === COLLAR_TYPE.CANCEL_SUBSCRIPTION) {
    return COLLAR_BUTTON_TEXT.CANCEL_SUBSCRIPTION
  } else {
    return COLLAR_BUTTON_TEXT.SUBSCRIBE
  }
}
