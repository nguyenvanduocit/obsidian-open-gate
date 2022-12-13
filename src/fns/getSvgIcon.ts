export const getSvgIcon = (siteUrl: string): string => {
    const hostName = new URL(siteUrl).hostname
    return `<image href="https://www.google.com/s2/favicons?domain=${hostName}&sz=100" height="100" width="100" />`
}
