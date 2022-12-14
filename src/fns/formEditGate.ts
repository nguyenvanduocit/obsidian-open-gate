import { Setting } from 'obsidian'
import { getSvgIcon } from './getSvgIcon'

export const formEditGate = (
    contentEl: HTMLElement,
    gateOptions: GateFrameOption,
    onSubmit: (result: GateFrameOption) => void
) => {
    new Setting(contentEl).setName('URL').addText((text) =>
        text
            .setPlaceholder('https://example.com')
            .setValue(gateOptions.url)
            .onChange(async (value) => {
                gateOptions.url = value
            })
    )

    new Setting(contentEl).setName('Name')
        .setDesc('Leave it blank to use the URL as the name')
        .addText((text) =>
        text

            .setValue(gateOptions.title)
            .onChange(async (value) => {
                gateOptions.title = value
            })
    )

    new Setting(contentEl)
        .setName('Icon')
        .setDesc('Leave it blank to enable auto-detect')
        .addText((text) =>
        text
            .setValue(gateOptions.icon)
            .onChange(async (value) => {
                gateOptions.icon = value
            })
    )

    new Setting(contentEl).setName('Pin to menu').addToggle((text) =>
        text
            .setValue(gateOptions.hasRibbon === true)
            .onChange(async (value) => {
                gateOptions.hasRibbon = value
            })
    )

    new Setting(contentEl).setName('Position').addDropdown((text) =>
        text
            .addOption('left', 'Left')
            .addOption('right', 'Right')
            .addOption('center', 'Center')
            .setValue(gateOptions.position ?? 'right')
            .onChange(async (value) => {
                gateOptions.position = value as GateFrameOptionType
            })
    )

    new Setting(contentEl).addButton((btn) =>
        btn
            .setButtonText(gateOptions.id ? 'Update' : 'Create')
            .setCta()
            .onClick(() => {
                if (gateOptions.id === '') {
                    gateOptions.id = btoa(gateOptions.url)
                }
                if (gateOptions.icon === '') {
                    gateOptions.icon = getSvgIcon(gateOptions.url)
                }
                if (gateOptions.title === '') {
                    gateOptions.title = gateOptions.url
                }
                onSubmit(gateOptions)
            })
    )
}
