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
import { setupLinkConvertMenu } from './fns/setupLinkConvertMenu'
import { setupInsertLinkMenu } from './fns/setupInsertLinkMenu'
import { PluginSetting } from './types'
import { GateFrameOption, GateFrameOptionType } from './GateOptions'

const DEFAULT_SETTINGS: PluginSetting = {
    uuid: '',
    gates: {}
}

export default class OpenGatePlugin extends Plugin {
    settings: PluginSetting

    async onload() {
        await this.loadSettings()
        await this.mayShowOnboardingDialog()
        await this.initGates()
        this.addSettingTab(new SettingTab(this.app, this))
        this.registerCommands()
        this.registerProtocol()
        setupLinkConvertMenu(this)
        setupInsertLinkMenu(this)
        registerCodeBlockProcessor(this)
    }

    async mayShowOnboardingDialog() {
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
    }

    private async initGates() {
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
        const { title, url, id, position } = data

        // Initialize targetGate as undefined
        let targetGate: GateFrameOption | undefined

        // Search for the gate by id first
        if (id && this.settings.gates[id]) {
            targetGate = this.settings.gates[id]
        } else {
            // Search for the gate by title or url if id is not found
            targetGate = Object.values(this.settings.gates).find(
                (gate) => (title && gate.title.toLowerCase() === title.toLowerCase()) || (url && gate.url.toLowerCase() === url.toLowerCase())
            )
        }

        // If no gate is found, create a new empty gate option
        if (!targetGate) {
            targetGate = createEmptyGateOption()
        }

        // Update the url and position if needed
        if (url) {
            targetGate.url = url
        }

        if (position) {
            targetGate.position = position as GateFrameOptionType
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

        console.log(targetGate)

        const gate = await openView(this.app.workspace, targetGate?.id || 'temp-gate', targetGate?.position)
        const gateView = gate.view as GateView
        gateView?.onFrameReady(() => {
            gateView.setUrl(data.url)
        })
    }

    async addGate(gate: GateFrameOption) {
        const normalizedGate = normalizeGateOption(gate)

        if (!this.settings.gates.hasOwnProperty(normalizedGate.id)) {
            registerGate(this, normalizedGate)
        } else {
            new Notice('This change will take effect after you reload Obsidian.')
        }

        this.settings.gates[normalizedGate.id] = normalizedGate

        await this.saveSettings()
    }

    async removeGate(gateId: string) {
        if (!this.settings.gates[gateId]) {
            new Notice('Gate not found')
            return
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
