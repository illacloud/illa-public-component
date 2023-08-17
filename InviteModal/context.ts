import { createContext } from "react"
import { InviteModalContextProps } from "./interface"


export const InviteModalContext = createContext<InviteModalContextProps>(
  {} as InviteModalContextProps,
)