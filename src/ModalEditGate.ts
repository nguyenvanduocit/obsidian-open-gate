import { App, Modal } from 'obsidian'
import { formEditGate } from './fns/formEditGate'

export class ModalEditGate extends Modal {
    gateOptions: GateFrameOption
    onSubmit: (result: GateFrameOption) => void
    constructor(
        app: App,
        gateOptions: GateFrameOption,
        onSubmit: (result: GateFrameOption) => void
    ) {
        super(app)
        this.onSubmit = onSubmit
        this.gateOptions = gateOptions
    }

    onOpen() {
        const { contentEl } = this
        contentEl.createEl('h3', { text: 'Open Gate' })
        formEditGate(contentEl, this.gateOptions, (result) => {
            this.onSubmit(result)
            this.close()
        })
    }

    onClose() {
        const { contentEl } = this
        contentEl.empty()
    }
}
