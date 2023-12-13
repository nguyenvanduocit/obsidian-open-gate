import { App, Modal, Setting } from 'obsidian'
import { createEmptyGateOption } from './fns/createEmptyGateOption'
import { normalizeGateOption } from './fns/normalizeGateOption'

export class ModalInsertLink extends Modal {
    onSubmit: (result: GateFrameOption) => void
    constructor(app: App, onSubmit: (result: GateFrameOption) => void) {
        super(app)
        this.onSubmit = onSubmit
    }

    onOpen() {
        this.titleEl.setText('Insert Link')
        this.createFormInsertLink()
    }

    onClose() {
        const { contentEl } = this
        contentEl.empty()
    }

    createFormInsertLink() {
        let gateOptions = createEmptyGateOption()
        new Setting(this.contentEl)
            .setName('URL')
            .setClass('open-gate--form-field')
            .addText((text) =>
                text.setPlaceholder('https://example.com').onChange(async (value) => {
                    gateOptions.url = value
                })
            )

        new Setting(this.contentEl)
            .setName('Title')
            .setClass('open-gate--form-field')
            .addText((text) =>
                text.onChange(async (value) => {
                    gateOptions.title = value
                })
            )

        new Setting(this.contentEl).addButton((btn) =>
            btn
                .setButtonText('Insert Link')
                .setCta()
                .onClick(async () => {
                    gateOptions = normalizeGateOption(gateOptions)
                    this.onSubmit(gateOptions)
                })
        )
    }
}
