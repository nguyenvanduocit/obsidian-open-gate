export const getSvgIcon = (siteUrl: string): string => {
    const domain = new URL(siteUrl).hostname
    return `<svg viewBox="0 0 100 100"><image href="https://icon.horse/icon/${domain}" height="100" width="100" /></svg>`
}