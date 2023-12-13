export default class DisplayNameGenerator {
  private displayNameList = new Set<string>()

  constructor(placeholderDisplayNames: string[]) {
    this.displayNameList = new Set(placeholderDisplayNames)
  }

  public isAlreadyExist = (displayName: string) => {
    return this.displayNameList.has(displayName)
  }

  public generateDisplayName = (
    prefix: string,
    callback?: (newDisplayName: string) => void,
  ) => {
    let index = 1
    let displayName = `${prefix}${index}`

    while (this.isAlreadyExist(displayName)) {
      index++
      displayName = `${prefix}${index}`
    }
    this.displayNameList.add(displayName)
    callback?.(displayName)
    return displayName
  }

  public setDisplayNameList = (displayNameList: string[]) => {
    this.displayNameList = new Set(displayNameList)
  }

  public addDisplayNames = (displayNameList: string[]) => {
    displayNameList.forEach((displayName) => {
      this.displayNameList.add(displayName)
    })
  }

  public removeMultiDisplayName = (
    displayNames: string[],
    callback?: (displayName: string[]) => void,
  ) => {
    displayNames.forEach((displayName) => {
      this.displayNameList.delete(displayName)
    })
    callback?.(displayNames)
  }

  public updateOrGenerateDisplayName = (
    displayName: string,
    addCallback?: (displayName: string) => void,
  ) => {
    if (this.isAlreadyExist(displayName)) {
      return this.generateDisplayName(displayName, addCallback)
    } else {
      this.displayNameList.add(displayName)
      addCallback?.(displayName)
      return displayName
    }
  }
}
