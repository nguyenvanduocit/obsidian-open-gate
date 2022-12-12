import { Notice, Plugin } from 'obsidian'
import { SettingTab } from './SetingTab'
import { registerGate } from './fns/registerGate'
import { ModalEditGate } from './ModalEditGate'
import { ModalOnBoarding } from './ModalOnboarding'
import { unloadView } from './fns/unloadView'
import { createEmptyGateOption } from './fns/createEmptyGateOption'

interface PluginSetting {
    isFirstRun: boolean
    gates: Record<string, GateFrameOption>
}

const DEFAULT_SETTINGS: PluginSetting = {
    isFirstRun: true,
    gates: {}
}

export default class OpenGatePlugin extends Plugin {
    settings: PluginSetting

    async onload() {
        await this.loadSettings()
        for (const gateId in this.settings.gates) {
            const gate = this.settings.gates[gateId]
            registerGate(this, gate)
        }

        this.addSettingTab(new SettingTab(this.app, this))

        this.addCommand({
            id: `open-gate-create-new`,
            name: `Create new gate`,
            callback: async () => {
                new ModalEditGate(
                    this.app,
                    createEmptyGateOption(),
                    async (gate: GateFrameOption) => {
                        await this.addGate(gate)
                    }
                ).open()
            }
        })
    }

    onunload() {}

    async addGate(gate: GateFrameOption) {
        if (!this.settings.gates.hasOwnProperty(gate.id)) {
            registerGate(this, gate)
        } else {
            new Notice(
                'This change will take effect after you reload Obsidian.'
            )
        }

        this.settings.gates[gate.id] = gate
        await this.saveSettings()
    }

    async removeGate(gateId: string) {
        if (!this.settings.gates[gateId]) {
            new Notice('Gate not found')
        }

        const gate = this.settings.gates[gateId]

        await unloadView(this.app.workspace, gate)
        delete this.settings.gates[gateId]
        await this.saveSettings()
        new Notice('This change will take effect after you reload Obsidian.')
    }

    async loadSettings() {
        this.settings = await this.loadData()

        if (!this.settings) {
            this.settings = DEFAULT_SETTINGS
        }

        if (!this.settings.isFirstRun) {
            return
        }

        this.settings.isFirstRun = false
        await this.saveSettings()

        if (Object.keys(this.settings.gates).length === 0) {
            new ModalOnBoarding(
                this.app,
                createEmptyGateOption(),
                async (gate: GateFrameOption) => {
                    await this.addGate(gate)
                }
            ).open()
        }
    }

    async saveSettings() {
        await this.saveData(this.settings)
    }
}
