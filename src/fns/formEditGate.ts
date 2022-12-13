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

    new Setting(contentEl).setName('Name').addText((text) =>
        text
            .setPlaceholder('Gate title')
            .setValue(gateOptions.title)
            .onChange(async (value) => {
                gateOptions.title = value
            })
    )

    new Setting(contentEl).setName('Pin to menu').addToggle((text) =>
        text
            .setValue(gateOptions.hasRibbon === true)
            .onChange(async (value) => {
                gateOptions.hasRibbon = value
            })
    )

    new Setting(contentEl).setName('Pin to menu').addDropdown((text) =>
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
                gateOptions.icon = getSvgIcon(gateOptions.url)
                onSubmit(gateOptions)
            })
    )
}
