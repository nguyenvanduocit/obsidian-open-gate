export const getSvgIcon = (siteUrl: string): string => {
    const siteId = btoa(siteUrl)
    return `<svg viewBox="0 0 100 100"><image href="https://fetch-favicon.fly.dev/favicon/${siteId}" height="100" width="100" /></svg>`
}
