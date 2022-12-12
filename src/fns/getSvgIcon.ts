export const getSvgIcon = (siteUrl: string): string => {
    const hostName = new URL(siteUrl).hostname
    return `<svg viewBox="0 0 100 100"><image href="https://www.google.com/s2/favicons?domain=${hostName}&sz=100" height="100" width="100" /><svg>`
}
