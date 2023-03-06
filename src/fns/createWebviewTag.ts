import WebviewTag = Electron.WebviewTag;

export const createWebviewTag = (url: string, userAgent?: string, zoomFactory?: number): WebviewTag => {
    const id = 'open-gate' // use the same ID for every webview, that allow to save cookie
    const webviewTag = document.createElement(
        'webview'
    ) as unknown as WebviewTag
    webviewTag.setAttribute('allowpopups', 'true')
    webviewTag.setAttribute('partition', 'persist:' + id)
    webviewTag.setAttribute('src', url)
    webviewTag.setAttribute('nodeintegration', "true")
    webviewTag.addClass('open-gate-webview')

    if (userAgent) {
        webviewTag.setAttribute('useragent', userAgent)
    }

    webviewTag.addEventListener('did-attach', () => {
        console.log(zoomFactory)
    })



    return webviewTag
}
