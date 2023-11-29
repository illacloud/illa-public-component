import { isInt } from "./typeHelper"

export const convertPathToString = (attrPath: string[] | number[]) => {
  let string = ""
  attrPath.forEach((segment) => {
    if (isInt(segment)) {
      string = string + "[" + segment + "]"
    } else {
      if (string.length !== 0) {
        string = string + "."
      }
      string = string + segment
    }
  })
  return string
}
