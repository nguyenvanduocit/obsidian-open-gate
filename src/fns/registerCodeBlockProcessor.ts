import { Platform } from 'obsidian'
import { parse } from 'yaml'
import { createIframe } from './createIframe'
import { createWebviewTag } from './createWebviewTag'
import WebviewTag = Electron.WebviewTag
import { createEmptyGateOption } from './createEmptyGateOption'
import OpenGatePlugin from '../main'
import { normalizeGateOption } from './normalizeGateOption'
import { GateFrameOption } from '../GateOptions'

type CodeBlockOption = GateFrameOption & {
    height?: string | number
}

function processNewSyntax(plugin: OpenGatePlugin, sourceCode: string): Node {
    // we want user follow the yaml format, but sometime, it's easier for user to just type the url in the first line, so we support that
    const firstLineUrl = sourceCode.split('\n')[0]
    if (firstLineUrl.startsWith('http')) {
        sourceCode = sourceCode.replace(firstLineUrl, '').trim()
    }
    // Replace tabs with spaces at the start of each line, because YAML doesn't support tabs
    sourceCode = sourceCode.replace(/^\t+/gm, (match) => '  '.repeat(match.length))

    if (sourceCode.length === 0) {
        return createFrame(createEmptyGateOption(), '800px')
    }

    let data: Partial<CodeBlockOption> = {}

    if (firstLineUrl.startsWith('http')) {
        data.url = firstLineUrl
    }

    try {
        data = Object.assign(data, parse(sourceCode))
    } catch (error) {
        return createErrorMessage(error)
    }

    if (typeof data !== 'object' || data === null || Object.keys(data).length === 0) {
        return createErrorMessage()
    }

    let height = '800px'
    if (data.height) {
        height = typeof data.height === 'number' ? `${data.height}px` : data.height
        delete data.height
    }

    let prefill: GateFrameOption | undefined

    if (data.title) {
        prefill = plugin.findGateBy('title', data.title)
    } else if (data.url) {
        prefill = plugin.findGateBy('url', data.url)
    }

    if (prefill) {
        data = Object.assign(prefill, data)
    }

    return createFrame(normalizeGateOption(data), height)
}

function createErrorMessage(error?: Error): Node {
    const div = document.createElement('div')

    const messageText = 'The syntax has been updated. Please use the YAML format.'
    const messageTextNode = document.createTextNode(messageText)
    div.appendChild(messageTextNode)

    if (error) {
        const errorDetailsText = `\nError details: ${error.message}`
        const errorDetailsTextNode = document.createTextNode(errorDetailsText)
        div.appendChild(errorDetailsTextNode)
    }

    const linkText = '\nRead more about YAML here.'
    const linkTextNode = document.createTextNode(linkText)
    const linkNode = document.createElement('a')
    linkNode.href = 'https://yaml.org/spec/1.2/spec.html'
    linkNode.textContent = 'YAML Syntax'
    div.appendChild(linkTextNode)
    div.appendChild(linkNode)

    return div
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

export function registerCodeBlockProcessor(plugin: OpenGatePlugin) {
    plugin.registerMarkdownCodeBlockProcessor('gate', (sourceCode, el, _ctx) => {
        el.addClass('open-gate-view')
        const frame = processNewSyntax(plugin, sourceCode)
        el.appendChild(frame)
    })
}
