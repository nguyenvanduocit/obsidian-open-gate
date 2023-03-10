import WebviewTag = Electron.WebviewTag;

export const createWebviewTag = (params: GateFrameOption): WebviewTag => {
    const webviewTag = document.createElement(
        'webview'
    ) as unknown as WebviewTag
    webviewTag.setAttribute('allowpopups', 'true')
    webviewTag.setAttribute('partition', 'persist:' + params.profileKey)
    webviewTag.setAttribute('src', params.url)
    webviewTag.addClass('open-gate-webview')

    if (params.userAgent) {
        webviewTag.setAttribute('useragent', params.userAgent)
    }

    webviewTag.addEventListener('did-attach', () => {
        if (params.zoomFactor) {
            webviewTag.setZoomFactor(params.zoomFactor)
        }
    })

    return webviewTag
}
