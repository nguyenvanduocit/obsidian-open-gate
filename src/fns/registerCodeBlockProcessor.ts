import { Platform, Plugin } from 'obsidian'
import { parse } from 'yaml'
import { createIframe } from './createIframe'
import { createWebviewTag } from './createWebviewTag'
import WebviewTag = Electron.WebviewTag
import { createEmptyGateOption } from './createEmptyGateOption'

function processNewSyntax(sourceCode: string): Node {
    const options = createEmptyGateOption()

    // we want user follow the yaml format, but sometime, it's easier for user to just type the url in the first line, so we support that
    const firstLine = sourceCode.split('\n')[0]
    if (firstLine.startsWith('http')) {
        options.url = firstLine
        sourceCode = sourceCode.replace(firstLine, '').trim()
    }

    // Replace tabs with spaces at the start of each line, because YAML doesn't support tabs
    sourceCode = sourceCode.replace(/^\t+/gm, (match) => '  '.repeat(match.length))

    if (sourceCode.length === 0) {
        return createFrame(createEmptyGateOption(), '800px')
    }

    let data
    try {
        data = parse(sourceCode)
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

    Object.assign(options, data)

    return createFrame(options, height)
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

export function registerCodeBlockProcessor(plugin: Plugin) {
    plugin.registerMarkdownCodeBlockProcessor('gate', (sourceCode, el, ctx) => {
        el.addClass('open-gate-view')
        const frame = processNewSyntax(sourceCode)
        el.appendChild(frame)
    })
}
