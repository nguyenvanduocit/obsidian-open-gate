import { Platform, Plugin } from 'obsidian'
import { createWebviewTag } from './createWebviewTag'
import { createIframe } from './createIframe'
import WebviewTag = Electron.WebviewTag
import getDefaultUserAgent from './getDefaultUserAgent'

export const registerLinkProcessor = (plugin: Plugin) => {
    plugin.registerMarkdownPostProcessor((element, context) => {
        // get img elements
        const imgElements = element.querySelectorAll('img')
        // if src is not a file, replace el with webview
        imgElements.forEach((el) => {
            const src = el.getAttribute('src')
            // alt is: height=12px;profile=abc
            // parse alt to get height and profile
            const alt = el.getAttribute('alt')
            const altArr = alt?.split(';')

            let height = altArr ? altArr[0].replace('height:', '')?.trim() ?? '400px' : '400px'
            if (!isNaN(Number(height))) {
                height = height + 'px'
            }

            if (!src || isImageExt(src)) {
                return
            }

            let frame: HTMLIFrameElement | WebviewTag
            const options = {
                profileKey: altArr ? altArr[1]?.replace('profile:', '') : 'open-gate',
                url: src,
                userAgent: altArr ? altArr[2]?.replace('useragent:', '') : getDefaultUserAgent(),
                zoomFactor: altArr ? parseFloat(altArr[3]?.replace('zoom:', '') ?? '1') : 1
            }

            if (Platform.isMobileApp) {
                frame = createIframe(options)
            } else {
                frame = createWebviewTag(options)
            }

            frame.setAttribute('style', 'width: 100%; height: ' + height + ';')

            el.replaceWith(frame)
        })
    })
}

// if url end with file extension, return true
const isImageExt = (url: string) => {
    const exts = ['jpg', 'jpeg', 'png', 'gif', 'svg']
    const urlArr = url.split('.')
    const ext = urlArr[urlArr.length - 1]
    return exts.includes(ext)
}
