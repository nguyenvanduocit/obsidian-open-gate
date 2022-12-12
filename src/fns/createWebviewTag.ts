export const createWebviewTag = (url: string): WebviewTag => {
    // has url to base64
    //const id = btoa(url);
    const id = 'open-gate' // use the same ID for every webview, that allow to save cookie
    const webviewTag = document.createElement(
        'webview'
    ) as unknown as WebviewTag
    webviewTag.setAttribute('allowpopups', 'true')
    webviewTag.setAttribute('partition', 'persist:' + id)
    webviewTag.setAttribute('src', url)
    webviewTag.addClass('open-gate-webview')
    return webviewTag
}
