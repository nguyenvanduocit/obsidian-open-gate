import { App, getIcon, Modal } from 'obsidian'
import { createFormEditGate } from './fns/createFormEditGate'
import { openView } from './fns/openView'
import { GateFrameOption } from './GateOptions'

export class ModalListGates extends Modal {
    gates: Record<string, GateFrameOption>
    onSubmit: (result: GateFrameOption) => void
    constructor(app: App, gates: Record<string, GateFrameOption>, onSubmit: (result: GateFrameOption) => void) {
        super(app)
        this.onSubmit = onSubmit
        this.gates = gates
    }

    onOpen() {
        const { contentEl } = this

        for (const gateId in this.gates) {
            const gate = this.gates[gateId]
            // create svg icon
            const container = contentEl.createEl('div', {
                cls: 'open-gate--quick-list-item'
            })

            if (!gate.icon.startsWith('<svg')) {
                const iconSvg = getIcon(gate.icon) ?? getIcon('link-external')!
                iconSvg.classList.add('svg-icon')
                container.appendChild(iconSvg)
            } else {
                //@ts-ignore-next-line
                container.createEl('svg', { cls: 'svg-icon' }).innerHTML = gate.icon
            }

            container.createEl('span', { text: gate.title })

            container.addEventListener('click', async () => {
                await openView(this.app.workspace, gate.id, gate.position)
                this.close()
            })
        }
    }
}
