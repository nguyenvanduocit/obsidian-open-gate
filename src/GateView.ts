import { ItemView, WorkspaceLeaf, Menu } from 'obsidian'
import { createWebviewTag } from './fns/createWebviewTag'
import { Platform } from 'obsidian'
import { createIframe } from './fns/createIframe'
import { clipboard } from 'electron'
import WebviewTag = Electron.WebviewTag
import { GateFrameOption } from './GateOptions'
import { callbackify } from 'util'

export class GateView extends ItemView {
    private readonly options: GateFrameOption
    private frame: WebviewTag | HTMLIFrameElement
    private readonly useIframe: boolean = false
    private frameReadyCallbacks: Function[]
    private isFrameReady: boolean = false
    private frameDoc: Document

    constructor(leaf: WorkspaceLeaf, options: GateFrameOption) {
        super(leaf)
        this.navigation = false
        this.options = options
        this.useIframe = Platform.isMobileApp
        this.frameReadyCallbacks = []
    }

    addActions(): void {
        this.addAction('refresh-ccw', 'Reload', () => {
            if (this.frame instanceof HTMLIFrameElement) {
                this.frame.contentWindow?.location.reload()
            } else {
                this.frame.reload()
            }
        })

        this.addAction('home', 'Home page', () => {
            if (this.frame instanceof HTMLIFrameElement) {
                this.frame.src = this.options?.url ?? 'about:blank'
            } else {
                this.frame.loadURL(this.options?.url ?? 'about:blank')
            }
        })
    }

    isWebviewFrame(): boolean {
        return this.frame! instanceof HTMLIFrameElement
    }

    onload(): void {
        super.onload()
        this.addActions()

        this.contentEl.empty()
        this.contentEl.addClass('open-gate-view')

        this.frameDoc = this.contentEl.doc
        this.createFrame()
        }

        private createFrame(): void {
            const onReady = () => {
                if(!this.isFrameReady){
                    this.isFrameReady = true
                    this.frameReadyCallbacks.forEach((callback) => callback())
                }
            }

            if(this.useIframe){
                this.frame = createIframe(this.options, onReady)
            }else{
                this.frame = createWebviewTag(this.options, onReady, this.frameDoc)

                this.frame.addEventListener('destroyed', () => {

                    if(this.frameDoc != this.contentEl.doc){
                        if(this.frame){
                            this.frame.remove()
                        }
                        this.frameDoc = this.contentEl.doc
                        this.createFrame()
                    }
                })
            }
 
            this.contentEl.appendChild(this.frame as unknown as HTMLElement)
        }



    onunload(): void {

        if(this.frame){
            this.frame.remove()
        }
        super.onunload()

    }

    onPaneMenu(menu: Menu, source: string): void {
        super.onPaneMenu(menu, source)
        menu.addItem((item) => {
            item.setTitle('Reload')
            item.setIcon('refresh-ccw')
            item.onClick(() => {
                if (this.frame instanceof HTMLIFrameElement) {
                    this.frame.contentWindow?.location.reload()
                } else {
                    this.frame.reload()
                }
            })
        })
        menu.addItem((item) => {
            item.setTitle('Home page')
            item.setIcon('home')
            item.onClick(async () => {
                if (this.frame instanceof HTMLIFrameElement) {
                    this.frame.src = this.options?.url ?? 'about:blank'
                } else {
                    await this.frame.loadURL(this.options?.url ?? 'about:blank')
                }
            })
        })
        menu.addItem((item) => {
            item.setTitle('Toggle DevTools')
            item.setIcon('file-cog')
            item.onClick(() => {
                if (this.frame instanceof HTMLIFrameElement) {
                    return
                }

                if (this.frame.isDevToolsOpened()) {
                    this.frame.closeDevTools()
                } else {
                    this.frame.openDevTools()
                }
            })
        })

        menu.addItem((item) => {
            item.setTitle('Copy Page URL')
            item.setIcon('clipboard-copy')
            item.onClick(() => {
                if (this.frame instanceof HTMLIFrameElement) {
                    clipboard.writeText(this.frame.src)
                    return
                }

                clipboard.writeText(this.frame.getURL())
            })
        })

        // Open in Default Browser
        menu.addItem((item) => {
            item.setTitle('Open in browser')
            item.setIcon('globe')
            item.onClick(() => {
                if (this.frame instanceof HTMLIFrameElement) {
                    window.open(this.frame.src)
                    return
                }

                window.open(this.frame.getURL())
            })
        })
    }

    getViewType(): string {
        return this.options?.id ?? 'gate'
    }

    getDisplayText(): string {
        return this.options?.title ?? 'Gate'
    }

    getIcon(): string {
        if (this.options?.icon.startsWith('<svg')) {
            return this.options.id
        }

        return this.options?.icon ?? 'globe'
    }

    /**
     * Allows us to run code when the frame has loaded.
     * Note that the frame may already be loaded in which case we will directly call the callback instead of waiting for an event.
     * @param callback
     */
    onFrameReady(callback: Function) {
        if (this.isFrameReady) {
            callback()
        } else {
            this.frameReadyCallbacks.push(callback)
        }
    }

    /**
     * This allows us to dynamically route the frame to a different URL
     * @param url
     */
    async setUrl(url: string) {
        if (this.frame instanceof HTMLIFrameElement) {
            this.frame.src = url
        } else {
            if (this.frame.isLoading()) {
                this.frame.stop()
            }

            await this.frame.loadURL(url)
        }
    }
}
