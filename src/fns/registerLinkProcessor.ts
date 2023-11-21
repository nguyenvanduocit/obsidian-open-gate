import { Platform, Plugin } from 'obsidian'
import { createWebviewTag } from './createWebviewTag'
import { createIframe } from './createIframe'
import WebviewTag = Electron.WebviewTag
import getDefaultUserAgent from './getDefaultUserAgent'
function processImageElement(el: HTMLImageElement, plugin: Plugin) {
    const src = el.getAttribute('src')
    if (!src || !src.endsWith('open-gate')) {
        return
    }

    const altAttributes = parseAltAttribute(el.getAttribute('alt'))

    let height = altAttributes.get('height') ?? '400px'
    if (!isNaN(Number(height))) {
        height = height + 'px'
    }

    const profile = altAttributes.get('profile') ?? 'open-gate'
    const userAgent = altAttributes.get('useragent') ?? getDefaultUserAgent()
    const zoom = parseFloat(altAttributes.get('zoom') ?? '1')

    let frame: HTMLIFrameElement | WebviewTag
    const options = {
        profileKey: profile,
        url: src,
        userAgent: userAgent,
        zoomFactor: zoom
    }

    if (Platform.isMobileApp) {
        frame = createIframe(options)
    } else {
        frame = createWebviewTag(options)
    }

    frame.setAttribute('style', 'width: 100%; height: ' + height + ';')

    el.replaceWith(frame)
}

function parseAltAttribute(alt: string | null): Map<string, string> {
    const map = new Map<string, string>()
    if (alt) {
        const pairs = alt.split(';')
        pairs.forEach((pair) => {
            const [key, value] = pair.split(':').map((s) => s.trim())
            map.set(key, value)
        })
    }
    return map
}

export const registerLinkProcessor = (plugin: Plugin) => {
    plugin.registerMarkdownPostProcessor((element, context) => {
        const imgElements = element.querySelectorAll('img')
        imgElements.forEach((el) => processImageElement(el, plugin))
    })
}
