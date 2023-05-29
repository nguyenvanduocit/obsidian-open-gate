export const createIframe = (
    params: Partial<GateFrameOption>
): HTMLIFrameElement => {
    const iframe = document.createElement('iframe')

    iframe.setAttribute('allowpopups', '')
    iframe.setAttribute('credentialless', 'true')
    iframe.setAttribute('src', params.url ?? 'about:blank')
    iframe.setAttribute(
        'sandbox',
        'allow-scripts allow-same-origin allow-popups allow-forms'
    )
    iframe.addClass('open-gate-iframe')

    return iframe
}
