export const sendTagEvent = (action: string, userID: string | undefined) => {
  if (
    typeof window !== "undefined" &&
    "gtag" in window &&
    process.env.ILLA_INSTANCE_ID === "CLOUD"
  ) {
    window.gtag("event", action, {
      user_id: userID,
      debug_mode: process.env.ILLA_APP_ENV !== "production",
    })
  }
}
