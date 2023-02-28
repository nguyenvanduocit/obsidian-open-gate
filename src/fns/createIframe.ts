export const createIframe = (url: string): HTMLIFrameElement => {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('allowpopups', '')
    iframe.setAttribute('credentialless', 'true')
    iframe.setAttribute('src', url)
    iframe.addClass('open-gate-iframe')

    return iframe
}
