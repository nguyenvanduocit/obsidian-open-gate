import { App, Platform, Plugin } from 'obsidian'
import { createIframe } from './createIframe'
import { createWebviewTag } from './createWebviewTag'
import WebviewTag = Electron.WebviewTag

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

        let src = ''
        let height = 'fit-content'
        let profileKey = 'open-gate'
        let userAgent = ''
        let zoomFactor = 1

        for (const line of lines) {
            if (line.startsWith('http')) {
                src = line.trim()
            } else if (line.startsWith('height:')) {
                height = line.replace('height:', '').trim()
                // if height is a number, add px
                if (!isNaN(Number(height))) {
                    height = height + 'px'
                }
            } else if (line.startsWith('profile:')) {
                profileKey = line.replace('profile:', '').trim()
            } else if (line.startsWith('useragent:')) {
                userAgent = line.replace('useragent:', '').trim()
            } else if (line.startsWith('zoom:')) {
                zoomFactor = parseFloat(line.replace('zoom:', '').trim())
            }
        }

        let frame: HTMLIFrameElement | WebviewTag
        const options = {
            profileKey: profileKey,
            url: src,
            userAgent: userAgent,
            zoomFactor: zoomFactor
        }

        if (Platform.isMobileApp) {
            frame = createIframe(options)
        } else {
            frame = createWebviewTag(options)
        }

        frame.style.height = height

        el.appendChild(frame)
    })
}
