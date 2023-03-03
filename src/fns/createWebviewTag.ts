export const createWebviewTag = (url: string, userAgent?: string): WebviewTag => {
    const id = 'open-gate' // use the same ID for every webview, that allow to save cookie
    const webviewTag = document.createElement(
        'webview'
    ) as unknown as WebviewTag
    webviewTag.setAttribute('allowpopups', '')
    webviewTag.setAttribute('partition', 'persist:' + id)
    webviewTag.setAttribute('src', url)
    webviewTag.addClass('open-gate-webview')
    if (userAgent) {
        webviewTag.setAttribute('useragent', userAgent)
    }
    return webviewTag
}
