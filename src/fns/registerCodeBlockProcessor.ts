import { Platform, Plugin } from 'obsidian'
import { parse } from 'yaml'
import { createIframe } from './createIframe'
import { createWebviewTag } from './createWebviewTag'
import WebviewTag = Electron.WebviewTag
import { createEmptyGateOption } from './createEmptyGateOption'

function processNewSyntax(sourceCode: string): Node {
    const url = sourceCode.split('\n')[0]
    sourceCode = sourceCode.replace(url, '').trim()

    const options = createEmptyGateOption()
    options.url = url

    let height = '800px'

    if (sourceCode.length !== 0) {
        const data = parse(sourceCode)

        if (typeof data !== 'object' || data === null || Object.keys(data).length === 0) {
            return document.createTextNode(
                "From version 1.10.0, the syntax of gate has changed. You have to use YAML format. Just like Obsidian's front matter. Sorry for the inconvenience."
            )
        }

        if (data.height) {
            // convert to string if it is number
            if (typeof data.height === 'number') {
                data.height = `${data.height}px`
            }

            height = data.height
            delete data.height
        }

        Object.assign(options, data)
    }

    let frame: HTMLIFrameElement | WebviewTag

    if (Platform.isMobileApp) {
        frame = createIframe(options)
    } else {
        frame = createWebviewTag(options)
    }

    frame.style.height = height

    if (frame instanceof HTMLIFrameElement) {
        // do nothing to do
    } else {
        frame.addEventListener('dom-ready', async () => {
            if (options?.css) {
                await (frame as WebviewTag).insertCSS(options.css)
            }
        })
    }

    return frame
}

export function registerCodeBlockProcessor(plugin: Plugin) {
    plugin.registerMarkdownCodeBlockProcessor('gate', (sourceCode, el, ctx) => {
        el.addClass('open-gate-view')
        const frame = processNewSyntax(sourceCode)
        el.appendChild(frame)
    })
}
