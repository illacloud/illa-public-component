import { CurrentUser } from "./currentUser"
import { Team } from "./team"

export type RootState = {
  currentUser: CurrentUser
  team: Team
}
