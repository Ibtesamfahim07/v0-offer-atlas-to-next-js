export const trackPageView = (path: string, title: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("config", "GA_MEASUREMENT_ID", {
      page_path: path,
      page_title: title,
    })
  }
}

export const trackEvent = (eventName: string, eventData: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", eventName, eventData)
  }
}
