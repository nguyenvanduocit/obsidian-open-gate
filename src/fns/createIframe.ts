import { GateFrameOption } from '../GateOptions'

export const createIframe = (params: Partial<GateFrameOption>, onReady?: () => void): HTMLIFrameElement => {
    const iframe = document.createElement('iframe')

    iframe.setAttribute('allowpopups', '')
    iframe.setAttribute('credentialless', 'true')
    iframe.setAttribute('crossorigin', 'anonymous')
    iframe.setAttribute('src', params.url ?? 'about:blank')
    iframe.setAttribute('sandbox', 'allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation')
    iframe.setAttribute('allow', 'encrypted-media; fullscreen; oversized-images; picture-in-picture; sync-xhr; geolocation')
    iframe.addClass('open-gate-iframe')

    iframe.addEventListener('load', () => {
        onReady?.call(null)

        if (params?.css) {
            const style = document.createElement('style')
            style.textContent = params.css
            iframe.contentDocument?.head.appendChild(style)
        }

        if (params?.js) {
            const script = document.createElement('script')
            script.textContent = params.js
            iframe.contentDocument?.head.appendChild(script)
        }
    })

    return iframe
}
