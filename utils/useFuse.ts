import Fuse from "fuse.js"
import { useEffect, useRef } from "react"

export function useFuse<T>(
  data: ReadonlyArray<T>,
  option?: Fuse.IFuseOptions<T>,
) {
  const fuseRef = useRef(new Fuse<T>(data, option))

  useEffect(() => {
    fuseRef.current = new Fuse<T>(data, option)
  }, [data, option])

  return fuseRef.current
}
