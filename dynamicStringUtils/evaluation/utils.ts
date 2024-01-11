export const isTrueObject = (
  item: unknown,
): item is Record<string, unknown> => {
  return Object.prototype.toString.call(item) === "[object Object]"
}

export const getAllPaths = (
  records: unknown,
  curKey = "",
  result: Record<string, true> = {},
): Record<string, true> => {
  // Add the key if it exists
  if (curKey) result[curKey] = true
  if (Array.isArray(records)) {
    for (let i = 0; i < records.length; i++) {
      const tempKey = curKey ? `${curKey}[${i}]` : `${i}`
      getAllPaths(records[i], tempKey, result)
    }
  } else if (isTrueObject(records)) {
    for (const key of Object.keys(records)) {
      const tempKey = curKey ? `${curKey}.${key}` : `${key}`
      getAllPaths(records[key], tempKey, result)
    }
  }
  return result
}
