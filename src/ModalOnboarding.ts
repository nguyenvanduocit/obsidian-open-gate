import { App, Modal } from 'obsidian'
import { createFormEditGate } from './fns/createFormEditGate'
import { GateFrameOption } from './GateOptions'

export class ModalOnBoarding extends Modal {
    gateOptions: GateFrameOption
    onSubmit: (result: GateFrameOption) => void
    constructor(app: App, gateOptions: GateFrameOption, onSubmit: (result: GateFrameOption) => void) {
        super(app)
        this.onSubmit = onSubmit
        this.gateOptions = gateOptions
    }

    onOpen() {
        const { contentEl } = this
        contentEl.createEl('h3', { text: 'Welcome to OpenGate' })
        contentEl.createEl('p', {
            text: 'OpenGate is a plugin that allows you to embed any website in Obsidian. You will never have to leave Obsidian again!'
        })

        contentEl.createEl('p', {
            text: 'If you need help, please join our community.'
        })

        contentEl.createEl('a', {
            cls: 'community-link',
            text: 'Community',
            attr: { href: 'https://community.aiocean.io/' }
        })

        contentEl.createEl('p', {
            text: 'But now you have to create your first gate.'
        })

        createFormEditGate(contentEl, this.gateOptions, (result) => {
            this.onSubmit(result)
            this.close()
        })
    }

    onClose() {
        const { contentEl } = this
        contentEl.empty()
    }
}
