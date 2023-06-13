import { App, Platform, Plugin } from 'obsidian'
import { createIframe } from './createIframe'
import { createWebviewTag } from './createWebviewTag'
import WebviewTag = Electron.WebviewTag
import getDefaultUserAgent from './getDefaultUserAgent'
import { createEmptyGateOption } from './createEmptyGateOption'

export function registerCodeBlockProcessor(plugin: Plugin) {
    plugin.registerMarkdownCodeBlockProcessor('gate', (sourceCode, el, ctx) => {
        el.addClass('open-gate-view')
        const lines = sourceCode
            .split('\n')
            .filter((row) => row.length > 0)
            .map((row) => row.trim())

        if (lines.length === 0) {
            return
        }

        const options = createEmptyGateOption()
        let height = '300px'
        for (const line of lines) {
            if (line.startsWith('http')) {
                options.url = line.trim()
            } else if (line.startsWith('height:')) {
                height = line.replace('height:', '').trim()
                if (!isNaN(Number(height))) {
                    height = height + 'px'
                }
            } else if (line.startsWith('profile:')) {
                options.profileKey = line.replace('profile:', '').trim()
            } else if (line.startsWith('useragent:')) {
                options.userAgent = line.replace('useragent:', '').trim()
            } else if (line.startsWith('zoom:')) {
                options.zoomFactor = parseFloat(line.replace('zoom:', '').trim())
            }
        }

        let frame: HTMLIFrameElement | WebviewTag

        if (Platform.isMobileApp) {
            frame = createIframe(options)
        } else {
            frame = createWebviewTag(options)
        }

        frame.style.height = height

        el.appendChild(frame)
    })
}
