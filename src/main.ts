import { Notice, Plugin } from 'obsidian'
import { SettingTab } from './SetingTab'
import { registerGate } from './fns/registerGate'
import { ModalEditGate } from './ModalEditGate'
import { ModalOnBoarding } from './ModalOnboarding'
import { unloadView } from './fns/unloadView'
import { createEmptyGateOption } from './fns/createEmptyGateOption'
import { ModalAskForLogPermission } from './ModalAskForLogPermission'

interface PluginSetting {
    isFirstRun: boolean
    gates: Record<string, GateFrameOption>
    allowErrorReport?: boolean
}

const DEFAULT_SETTINGS: PluginSetting = {
    isFirstRun: true,
    gates: {}
}

export default class OpenGatePlugin extends Plugin {
    settings: PluginSetting

    async onload() {
        await this.loadSettings()

        if (this.settings.isFirstRun) {
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

        for (const gateId in this.settings.gates) {
            const gate = this.settings.gates[gateId]
            registerGate(this, gate)
        }

        if (this.settings.allowErrorReport === true) {
            import('./datadog')
        }

        if (this.settings.allowErrorReport === undefined) {
            new ModalAskForLogPermission(
                this.app,
                this.onLogPermissionAllow.bind(this),
                this.onLogPermissionDeny.bind(this)
            ).open()
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

    async onLogPermissionAllow() {
        this.settings.allowErrorReport = true
        await this.saveSettings()
        import('./datadog')
    }

    async onLogPermissionDeny() {
        this.settings.allowErrorReport = false
        await this.saveSettings()
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
        // merge default settings
        this.settings = {
            ...DEFAULT_SETTINGS,
            ...this.settings
        }
    }

    async saveSettings() {
        await this.saveData(this.settings)
    }
}
