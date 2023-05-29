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

        for (const line of lines) {
            if (line.startsWith('http')) {
                src = line.trim()
            } else if (line.startsWith('height:')) {
                height = line.replace('height:', '').trim()
            } else if (line.startsWith('profile:')) {
                profileKey = line.replace('profile:', '').trim()
            }
        }

        let frame: HTMLIFrameElement | WebviewTag

        if (Platform.isMobileApp) {
            frame = createIframe(src)
        } else {
            const options = {
                icon: '',
                id: '',
                title: '',
                profileKey: profileKey,
                url: src
            }
            frame = createWebviewTag(options)
        }

        frame.style.height = height

        el.appendChild(frame)
    })
}
