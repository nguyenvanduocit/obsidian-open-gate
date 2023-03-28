import { Notice, Plugin } from 'obsidian'
import { SettingTab } from './SetingTab'
import { registerGate } from './fns/registerGate'
import { ModalEditGate } from './ModalEditGate'
import { ModalOnBoarding } from './ModalOnboarding'
import { unloadView } from './fns/unloadView'
import { createEmptyGateOption } from './fns/createEmptyGateOption'
import { normalizeGateOption } from './fns/normalizeGateOption'
import { ModalListGates } from './ModalListGates'

interface PluginSetting {
    isFirstRun: boolean
    gates: Record<string, GateFrameOption>
}

const DEFAULT_SETTINGS: PluginSetting = {
    isFirstRun: true,
    gates: {}
}

const defaultGateOption: Partial<GateFrameOption> = {
    profileKey: 'open-gate',
    zoomFactor: 1,
    userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.57'
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

        this.addCommand({
            id: `open-list-gates-modal`,
            name: `List Gates`,
            hotkeys: [{ modifiers: ["Mod", "Shift"], key: "g" }],
            callback: async () => {
                new ModalListGates(
                    this.app,
                    this.settings.gates,
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

        if (gate.profileKey === '' || gate.profileKey === undefined) {
            gate.profileKey = defaultGateOption.profileKey
        }

        if (gate.zoomFactor === 0 || gate.zoomFactor === undefined) {
            gate.zoomFactor = defaultGateOption.zoomFactor
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

        if (!this.settings.gates) {
            this.settings.gates = {}
        }

        for (const gateId in this.settings.gates) {
            this.settings.gates[gateId] = normalizeGateOption(
                this.settings.gates[gateId]
            )
        }
    }

    async saveSettings() {
        await this.saveData(this.settings)
    }
}
