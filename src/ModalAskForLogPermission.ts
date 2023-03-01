import { App, Modal } from 'obsidian'
import { formEditGate } from './fns/formEditGate'

export class ModalAskForLogPermission extends Modal {
    onAllow: () => void
    onDeny: () => void
    constructor(app: App, onAllow: () => void, onDeny: () => void) {
        super(app)
        this.onAllow = onAllow
        this.onDeny = onDeny
    }
    onOpen() {
        const { contentEl } = this
        contentEl.createEl('h2', { text: 'Help to improve' })
        contentEl.createEl('p', {
            text: 'To improve this plugin, we want to collect some logs. ONLY logs that produced by Open Gate will be collected, you can check our source code on Github. You can disable this collection at any time in the setting tab.'
        })

        const buttonGroup = contentEl.createDiv({ cls: 'setting-item-control' })

        buttonGroup
            .createEl('button', {
                text: 'Later'
            })
            .onClickEvent((evt) => {
                evt.preventDefault()
                if (this.onDeny) {
                    this.onDeny()
                }
                this.close()
            })

        // allow button
        buttonGroup
            .createEl('button', {
                text: 'Only allow logs from Open Gate',
                cls: 'mod-cta'
            })
            .onClickEvent((evt) => {
                evt.preventDefault()
                this.close()
                if (this.onAllow) {
                    this.onAllow()
                }
                this.close()
            })
    }
}
