function createFavicon() {
  const newFavicon = document.createElement("link")
  newFavicon.rel = "icon"
  document.getElementsByTagName("head")[0].appendChild(newFavicon)
  return newFavicon
}

function setFavicon(faviconHref: string) {
  const linkElements = document.getElementsByTagName("link")

  const faviconElements = []

  for (let i = 0; i < linkElements.length; i++) {
    const link = linkElements[i]
    if (link.rel.toLowerCase() === "icon") {
      faviconElements.push(link)
    }
  }

  if (faviconElements.length === 0) {
    const element = createFavicon()
    element.href = faviconHref
  } else {
    faviconElements.forEach((faviconElement) => {
      faviconElement.href = faviconHref
    })
  }
}

export async function validateCustomDomain() {
  const origin = location.origin
  if (origin !== "%ILLA_CLOUD_URL%") {
    try {
      const response = await fetch(
        `https://%ILLA_API_BASE_URL%/supervisor/api/v1/domain/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customDomain: location.host }),
        },
      )
      const data = (await response.json()) as {
        customDomainAvaliable: boolean
        title: string
        favicon: string
      }
      if (!data.customDomainAvaliable) {
        const redirectURL = window.location.href.replace(
          `https://${window.location.host}/cloud`,
          "%ILLA_CLOUD_URL%",
        )
        window.location.href = `%ILLA_CLOUD_URL%/redirect-expired?redirectURL=${redirectURL}`
        return
      }
      if (data.title) {
        document.title = data.title
      } else {
        document.title = "ILLA Cloud"
      }
      if (data.favicon) {
        setFavicon(data.favicon)
      } else {
        setFavicon("/ILLAFavicon.ico")
      }
      window.customDomain = location.host
    } catch {
      document.title = "ILLA Cloud"
      setFavicon("/ILLAFavicon.ico")
    }
  } else {
    document.title = "ILLA Cloud"
    setFavicon("/ILLAFavicon.ico")
  }
}
