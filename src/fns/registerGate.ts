import { GateView } from '../GateView'
import { openView } from './openView'
import { addIcon, Plugin } from 'obsidian'

export const registerGate = (plugin: Plugin, options: GateFrameOption) => {
    plugin.registerView(options.id, (leaf) => {
        return new GateView(leaf, options)
    })

    let iconName = options.icon

    if (options.icon.startsWith('<svg')) {
        addIcon(options.id, options.icon)
        iconName = options.id
    }

    if (options.hasRibbon) {
        plugin.addRibbonIcon(iconName, options.title, async (evt: MouseEvent) => openView(plugin.app.workspace, options.id, options.position))
    }

    plugin.addCommand({
        id: `open-gate-${btoa(options.url)}`,
        name: `Open gate ${options.title}`,
        callback: async () => await openView(plugin.app.workspace, options.id, options.position)
    })
}
