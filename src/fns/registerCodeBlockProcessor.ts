import { Platform, Plugin } from 'obsidian'
import { parse } from 'yaml'
import { createIframe } from './createIframe'
import { createWebviewTag } from './createWebviewTag'
import WebviewTag = Electron.WebviewTag
import { createEmptyGateOption } from './createEmptyGateOption'

function processNewSyntax(sourceCode: string): Node {
    const url = sourceCode.split('\n')[0]
    sourceCode = sourceCode.replace(url, '').trim()

    // Replace tabs with spaces at the start of each line, because YAML doesn't support tabs
    sourceCode = sourceCode.replace(/^\t+/gm, (match) => '  '.repeat(match.length))

    if (sourceCode.length === 0) {
        return createFrame(createEmptyGateOption(), '800px')
    }

    let data
    try {
        data = parse(sourceCode)
    } catch (error) {
        return createErrorMessage()
    }

    if (typeof data !== 'object' || data === null || Object.keys(data).length === 0) {
        return createErrorMessage()
    }

    const options = createEmptyGateOption()
    options.url = url

    let height = '800px'
    if (data.height) {
        height = typeof data.height === 'number' ? `${data.height}px` : data.height
        delete data.height
    }

    Object.assign(options, data)

    return createFrame(options, height)
}

function createErrorMessage(): Node {
    return document.createTextNode(
        "Starting from version 1.10.0, the syntax of 'gate' has been updated. You are now required to use the YAML format, similar to Obsidian's front matter. We apologize for any inconvenience this may cause."
    )
}

function createFrame(options: GateFrameOption, height: string): HTMLIFrameElement | WebviewTag {
    let frame: HTMLIFrameElement | WebviewTag

    if (Platform.isMobileApp) {
        frame = createIframe(options)
    } else {
        frame = createWebviewTag(options)
    }

    frame.style.height = height

    return frame
}

export function registerCodeBlockProcessor(plugin: Plugin) {
    plugin.registerMarkdownCodeBlockProcessor('gate', (sourceCode, el, ctx) => {
        el.addClass('open-gate-view')
        const frame = processNewSyntax(sourceCode)
        el.appendChild(frame)
    })
}
