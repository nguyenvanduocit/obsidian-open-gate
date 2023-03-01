import { App, PluginSettingTab, Setting, Platform } from 'obsidian'
import OpenGatePlugin from './main'
import { ModalEditGate } from './ModalEditGate'
import { createEmptyGateOption } from './fns/createEmptyGateOption'

export class SettingTab extends PluginSettingTab {
    plugin: OpenGatePlugin
    shouldNotify: boolean

    constructor(app: App, plugin: OpenGatePlugin) {
        super(app, plugin)
        this.plugin = plugin
    }

    async updateGate(gate: GateFrameOption) {
        await this.plugin.addGate(gate)
        this.display()
    }

    display(): void {
        this.shouldNotify = false
        const { containerEl } = this
        containerEl.empty()

        if (Platform.isMobileApp) {
            containerEl.createEl('div', {
                text: 'On mobile, some websites may not work. it is a limitation of Obsidian Mobile. Please use Obsidian Desktop instead. Follow me on Twitter to get the latest updates about the issue: ',
                cls: 'open-gate-mobile-warning'
            }).createEl('a', {
                text: '@duocdev',
                cls: 'open-gate-mobile-link',
                href: 'https://twitter.com/duocdev',
            })
        }

        containerEl
            .createEl('button', { text: 'New gate', cls: 'mod-cta' })
            .addEventListener('click', () => {
                new ModalEditGate(
                    this.app,
                    createEmptyGateOption(),
                    this.updateGate.bind(this)
                ).open()
            })

        containerEl.createEl('hr')

        const settingContainerEl = containerEl.createDiv('setting-container')

        for (const gateId in this.plugin.settings.gates) {
            const gate = this.plugin.settings.gates[gateId]
            const gateEl = settingContainerEl.createEl('div', {
                attr: {
                    'data-gate-id': gate.id
                }
            })

            new Setting(gateEl)
                .setName(gate.title)
                .setDesc(gate.url)
                .addButton((button) => {
                    button.setButtonText('Delete').onClick(async () => {
                        await this.plugin.removeGate(gateId)
                        gateEl.remove()
                    })
                })
                .addButton((button) => {
                    button.setButtonText('Edit').onClick(() => {
                        new ModalEditGate(
                            this.app,
                            gate,
                            this.updateGate.bind(this)
                        ).open()
                    })
                })
        }

        containerEl.createEl('h3', { text: 'Help' })

        containerEl.createEl('small', {
            attr: {
                style: 'display: block; margin-bottom: 5px'
            },
            text: 'When delete or edit a gate, you need to reload Obsidian to see the changes.'
        })

        containerEl.createEl('small', {
            attr: {
                style: 'display: block; margin-bottom: 1em;'
            },
            text: `To reload Obsidian, you can use the menu "view -> Force reload" or "Reload App" in the command palette.`
        })

        new Setting(containerEl)
            .setName('Follow me on Twitter')
            .setDesc('@duocdev')
            .addButton((button) => {
                button.setCta()
                button.setButtonText('Follow for update').onClick(() => {
                    window.open('https://twitter.com/duocdev')
                })
            })
            .addButton((button) => {
                button.buttonEl.outerHTML =
                    "<a href='https://paypal.me/duocnguyen' target='_blank'><img style='border:0px;height:35px;' src='https://cdn.ko-fi.com/cdn/kofi3.png?v=3' /></a>"
            })
    }
}
