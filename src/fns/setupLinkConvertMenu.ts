import { Editor, Menu, Notice, Plugin } from 'obsidian'
import { MarkdownLink } from '../types'

export const setupLinkConvertMenu = (plugin: Plugin) => {
    plugin.registerEvent(plugin.app.workspace.on('editor-menu', createMenu))
}

const parseLink = (text: string): MarkdownLink | undefined => {
    const markdownLinkMatch = text.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (markdownLinkMatch) {
        return {
            title: markdownLinkMatch[1],
            url: markdownLinkMatch[2]
        }
    }

    const urlMatch = text.match(/https?:\/\/[^ ]+/)
    if (urlMatch) {
        return {
            title: urlMatch[0],
            url: urlMatch[0]
        }
    }
}

const createMenu = (menu: Menu, editor: Editor) => {
    const selection = editor.getSelection()
    if (selection.length === 0) return

    const parsedLink = parseLink(selection)
    if (!parsedLink) return

    if (parsedLink.url.startsWith('obsidian://opengate')) {
        menu.addItem((item) => {
            item.setTitle('Convert to normal link').onClick(async () => {
                // get the url parameter from the link
                const urlMatch = parsedLink.url.match(/url=([^&]+)/)
                if (!urlMatch) {
                    new Notice('Can not convert the pre-configured gate link to normal link.')
                    return
                }

                const url = decodeURIComponent(urlMatch[1])
                const normalLink = `[${parsedLink.title}](${url})`
                editor.replaceSelection(normalLink)
            })
        })
    } else {
        menu.addItem((item) => {
            item.setTitle('Convert to Gate Link').onClick(async () => {
                const gateLink = `[${parsedLink.title}](obsidian://opengate?title=${encodeURIComponent(parsedLink.title)}&url=${encodeURIComponent(parsedLink.url)})`
                editor.replaceSelection(gateLink)
            })
        })
    }
}
