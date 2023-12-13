import { App, Editor, Menu, Notice, Plugin } from 'obsidian'
import { ModalOnBoarding } from '../ModalOnboarding'
import { createEmptyGateOption } from './createEmptyGateOption'
import { ModalInsertLink } from '../ModalInsertLink'

export const setupInsertLinkMenu = (plugin: Plugin) => {
    plugin.registerEvent(plugin.app.workspace.on('editor-menu', (menu, editor) => createMenu(plugin.app, menu, editor)))
}

const createMenu = (app: App, menu: Menu, editor: Editor) => {
    menu.addItem((item) => {
        item.setTitle('Insert Gate Link').onClick(async () => {
            new ModalInsertLink(app, async (gate: GateFrameOption) => {
                const gateLink = `[${gate.title}](obsidian://opengate?title=${encodeURIComponent(gate.title)}&url=${encodeURIComponent(gate.url)})`
                editor.replaceSelection(gateLink)
            }).open()
        })
    })
}

const getDialog = (plugin: Plugin) => {}
