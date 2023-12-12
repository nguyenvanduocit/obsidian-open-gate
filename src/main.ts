import { Notice, ObsidianProtocolData, Plugin } from 'obsidian'
import { SettingTab } from './SetingTab'
import { registerGate } from './fns/registerGate'
import { ModalEditGate } from './ModalEditGate'
import { ModalOnBoarding } from './ModalOnboarding'
import { unloadView } from './fns/unloadView'
import { createEmptyGateOption } from './fns/createEmptyGateOption'
import { normalizeGateOption } from './fns/normalizeGateOption'
import { ModalListGates } from './ModalListGates'
import { registerCodeBlockProcessor } from './fns/registerCodeBlockProcessor'
import { isViewExist, openView } from './fns/openView'
import { GateView } from './GateView'

interface PluginSetting {
    uuid: string
    gates: Record<string, GateFrameOption>
}

const DEFAULT_SETTINGS: PluginSetting = {
    uuid: '',
    gates: {}
}

const defaultGateOption: Partial<GateFrameOption> = {
    profileKey: 'open-gate',
    zoomFactor: 1
}

export default class OpenGatePlugin extends Plugin {
    settings: PluginSetting

    async onload() {
        await this.loadSettings()

        await this.initGates()
        this.addSettingTab(new SettingTab(this.app, this))
        this.registerCommands()
        this.registerProtocol()

        registerCodeBlockProcessor(this)
    }

    private async initGates() {
        // Check if the UUID in the settings is empty
        if (this.settings.uuid === '') {
            // Generate a new UUID and assign it to the settings
            this.settings.uuid = this.generateUuid()
            // Save the updated settings
            await this.saveSettings()

            // Check if there are no gates in the settings
            if (Object.keys(this.settings.gates).length === 0) {
                // Open the onboarding modal to create a new gate
                new ModalOnBoarding(this.app, createEmptyGateOption(), async (gate: GateFrameOption) => {
                    // Add the created gate to the settings
                    await this.addGate(gate)
                }).open()
            }
        }

        // Iterate over all the gates in the settings
        for (const gateId in this.settings.gates) {
            // Get the gate with the current ID
            const gate = this.settings.gates[gateId]
            // Register the gate
            registerGate(this, gate)
        }

        // this view is used to open gates from the protocol handler
        registerGate(
            this,
            normalizeGateOption({
                id: 'temp-gate',
                title: 'Temp Gate',
                icon: 'globe',
                url: 'about:blank'
            })
        )
    }

    private registerCommands() {
        this.addCommand({
            id: `open-gate-create-new`,
            name: `Create new gate`,
            callback: async () => {
                new ModalEditGate(this.app, createEmptyGateOption(), async (gate: GateFrameOption) => {
                    await this.addGate(gate)
                }).open()
            }
        })

        this.addCommand({
            id: `open-list-gates-modal`,
            name: `List Gates`,
            hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'g' }],
            callback: async () => {
                new ModalListGates(this.app, this.settings.gates, async (gate: GateFrameOption) => {
                    await this.addGate(gate)
                }).open()
            }
        })
    }

    /**
     * Register the "opengate" action to Obsidian.
     *
     * We will attempt to open a gate based on the provided title and navigate to the provided URL
     */
    private registerProtocol() {
        this.registerObsidianProtocolHandler('opengate', this.handleCustomProtocol.bind(this))
    }

    getGateOptionFromProtocolData(data: ObsidianProtocolData): GateFrameOption | undefined {
        const { title, url, id } = data

        let targetGate: GateFrameOption | undefined

        // search for the gate

        if (id && this.settings.gates[id]) {
            targetGate = this.settings.gates[id]
        }

        if (targetGate === undefined && title) {
            targetGate = Object.values(this.settings.gates).find((gate) => gate.title.toLowerCase() === title.toLowerCase())
        }

        if (targetGate === undefined && url) {
            targetGate = Object.values(this.settings.gates).find((gate) => gate.url.toLowerCase() === url.toLowerCase())
        }

        // update the url if needed
        if (targetGate !== undefined && url) {
            targetGate.url = url
        }

        return targetGate
    }

    findGateBy(field: 'title' | 'url', value: string): GateFrameOption | undefined {
        return Object.values(this.settings.gates).find((gate) => gate[field].toLowerCase() === value.toLowerCase())
    }

    async handleCustomProtocol(data: ObsidianProtocolData) {
        let targetGate = this.getGateOptionFromProtocolData(data)
        if (targetGate === undefined) {
            if (!data.url) {
                new Notice('Missing url parameter')
                return
            }
        }

        const gate = await openView(this.app.workspace, targetGate?.id || 'temp-gate')
        const gateView = gate.view as GateView
        gateView?.onFrameReady(() => {
            gateView?.setUrl(data.url)
        })
    }
    async addGate(gate: GateFrameOption) {
        if (!this.settings.gates.hasOwnProperty(gate.id)) {
            registerGate(this, gate)
        } else {
            new Notice('This change will take effect after you reload Obsidian.')
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
            this.settings.gates[gateId] = normalizeGateOption(this.settings.gates[gateId])
        }
    }

    async saveSettings() {
        await this.saveData(this.settings)
    }

    private generateUuid() {
        // generate uuid
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
}
