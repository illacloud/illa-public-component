import {
  ListenerEffectAPI,
  TypedStartListening,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit"
import currentUserReducer from "./currentUser/slice"
import teamReducer from "./team/slice"

const listenerMiddleware = createListenerMiddleware()

const userDataStore = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    team: teamReducer,
  },
  devTools: process.env.ILLA_APP_ENV === "development",
})

export default userDataStore
export type RootState = ReturnType<typeof userDataStore.getState>

export type AppDispatch = typeof userDataStore.dispatch

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening
