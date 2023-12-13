import { Setting } from 'obsidian'
import { getSvgIcon } from './getSvgIcon'
import { normalizeGateOption } from './normalizeGateOption'
import { createEmptyGateOption } from './createEmptyGateOption'

export const createFormEditGate = (contentEl: HTMLElement, gateOptions: GateFrameOption, onSubmit?: (result: GateFrameOption) => void) => {
    new Setting(contentEl)
        .setName('URL')
        .setClass('open-gate--form-field')
        .addText((text) =>
            text
                .setPlaceholder('https://example.com')
                .setValue(gateOptions.url)
                .onChange(async (value) => {
                    gateOptions.url = value
                })
        )

    new Setting(contentEl)
        .setName('Name')
        .setClass('open-gate--form-field')
        .addText((text) =>
            text.setValue(gateOptions.title).onChange(async (value) => {
                gateOptions.title = value
            })
        )

    new Setting(contentEl)
        .setName('Pin to menu')
        .setClass('open-gate--form-field')
        .setDesc('If enabled, the gate will be pinned to the left bar')
        .addToggle((text) =>
            text.setValue(gateOptions.hasRibbon === true).onChange(async (value) => {
                gateOptions.hasRibbon = value
            })
        )

    new Setting(contentEl)
        .setName('Position')
        .setClass('open-gate--form-field')
        .setDesc('What banner do you want to show?')
        .addDropdown((text) =>
            text
                .addOption('left', 'Left')
                .addOption('right', 'Right')
                .addOption('center', 'Center')
                .setValue(gateOptions.position ?? 'right')
                .onChange(async (value) => {
                    gateOptions.position = value as GateFrameOptionType
                })
        )

    new Setting(contentEl)
        .setName('Advanced Options')
        .setClass('open-gate--form-field')
        .addToggle((text) =>
            text.setValue(false).onChange(async (value) => {
                if (value) {
                    advancedOptions.addClass('open-gate--advanced-options--show')
                } else {
                    advancedOptions.removeClass('open-gate--advanced-options--show')
                }
            })
        )

    const advancedOptions = contentEl.createDiv({
        cls: 'open-gate--advanced-options'
    })

    new Setting(advancedOptions)
        .setName('Icon')
        .setClass('open-gate--form-field--column')
        .setDesc('Leave it blank to enable auto-detect')
        .addTextArea((text) =>
            text.setValue(gateOptions.icon).onChange(async (value) => {
                gateOptions.icon = value
            })
        )

    new Setting(advancedOptions)
        .setName('User Agent')
        .setClass('open-gate--form-field--column')
        .setDesc('Leave it blank if you are not sure')
        .addTextArea((text) =>
            text.setValue(gateOptions.userAgent ?? '').onChange(async (value) => {
                gateOptions.userAgent = value
            })
        )

    new Setting(advancedOptions)
        .setName('CSS')
        .setClass('open-gate--form-field--column')
        .setDesc('Leave it blank if you are not sure')
        .addTextArea((text) =>
            text.setValue(gateOptions.css ?? '').onChange(async (value) => {
                gateOptions.css = value
            })
        )

    new Setting(advancedOptions)
        .setName('Profile Key')
        .setClass('open-gate--form-field')
        .setDesc("It's like profiles in Chrome, gates with the same profile can share storage")
        .addText((text) =>
            text.setValue(gateOptions.profileKey ?? '').onChange(async (value) => {
                if (value === '') {
                    value = 'open-gate'
                }

                gateOptions.profileKey = value
            })
        )

    //zoomFactor
    new Setting(advancedOptions)
        .setName('Zoom Factor')
        .setClass('open-gate--form-field')
        .setDesc('Leave it blank if you are not sure')
        .addText((text) =>
            text.setValue(gateOptions.zoomFactor?.toString() ?? '0.0').onChange(async (value) => {
                gateOptions.zoomFactor = parseFloat(value)
            })
        )

    new Setting(contentEl).addButton((btn) =>
        btn
            .setButtonText(gateOptions.id ? 'Update the gate' : 'Create new gate')
            .setCta()
            .onClick(async () => {
                gateOptions = normalizeGateOption(gateOptions)
                onSubmit && onSubmit(gateOptions)
            })
    )
}
