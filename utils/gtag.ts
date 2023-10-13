import { isCloudVersion } from "./typeHelper"

export const initDateReport = () => {
  if (
    process.env.ILLA_APP_ENV &&
    process.env.ILLA_APP_ENV === "production" &&
    isCloudVersion
  ) {
    const gaScript = document.createElement("script")
    const gaSendScript = document.createElement("script")
    const linkedInScript = document.createElement("script")
    const linkedInSendScript = document.createElement("script")
    const linkedNoScript = document.createElement("noscript")
    const adsTwitterScript = document.createElement("script")
    gaSendScript.innerHTML = `
    window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag("js", new Date())
      gtag("config", 'G-QW745VE33W')`
    gaScript.async = true
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-QW745VE33W"
    linkedInScript.innerHTML = `
    _linkedin_partner_id = "4707852"
    window._linkedin_data_partner_ids =
      window._linkedin_data_partner_ids || []
    window._linkedin_data_partner_ids.push(_linkedin_partner_id)
    `
    linkedInSendScript.innerHTML = `
    ;(function (l) {
      if (!l) {
        window.lintrk = function (a, b) {
          window.lintrk.q.push([a, b])
        }
        window.lintrk.q = []
      }
      var s = document.getElementsByTagName("script")[0]
      var b = document.createElement("script")
      b.type = "text/javascript"
      b.async = true
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"
      s.parentNode.insertBefore(b, s)
    })(window.lintrk)
    `
    linkedNoScript.innerHTML = `
      <img
        height="1"
        width="1"
        style="display: none"
        alt=""
        src="https://px.ads.linkedin.com/collect/?pid=4707852&fmt=gif"
      />
    `

    adsTwitterScript.innerHTML = `
      !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
      },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
      a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
      twq('config','ogv2a');
    `
    document.body.append(
      gaScript,
      gaSendScript,
      linkedInScript,
      linkedInSendScript,
      linkedNoScript,
      adsTwitterScript,
    )
  }
}

export const sendTagEvent = (action: string, userID: string | undefined) => {
  if (typeof window !== "undefined" && "gtag" in window && isCloudVersion) {
    window.gtag("event", action, {
      user_id: userID,
    })
  }
}

export const sendConfigEvent = (userID: string | undefined) => {
  if (typeof window !== "undefined" && "gtag" in window && isCloudVersion) {
    window.gtag("config", "G-QW745VE33W", {
      user_id: userID,
    })
  }
}
