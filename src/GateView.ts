import { ItemView, WorkspaceLeaf, Menu } from 'obsidian'
import { createWebviewTag } from './fns/createWebviewTag'
import { Platform } from 'obsidian'
import { createIframe } from './fns/createIframe'
import { clipboard } from 'electron'
import WebviewTag = Electron.WebviewTag

export class GateView extends ItemView {
    private readonly options: GateFrameOption
    private frame: WebviewTag | HTMLIFrameElement
    private readonly useIframe: boolean = false
    private frameReadyCallbacks: Function[]
    private isFrameReady: boolean = false

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
                this.frame.src = this.frame.src
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

        if (this.useIframe) {
            this.frame = createIframe(this.options)
        } else {
            this.frame = createWebviewTag(this.options)
        }

        this.contentEl.appendChild(this.frame as unknown as HTMLElement)

        if (this.frame instanceof HTMLIFrameElement) {
            // do nothing to do
        } else {
            this.frame.addEventListener('will-navigate', this.webViewWillNavigate.bind(this))
            this.frame.addEventListener('console-message', async (event: Electron.ConsoleMessageEvent) => {
                if (event.message.startsWith('open-gate-open:')) {
                    const url = event.message.replace('open-gate-open:', '')
                    window.open(url)
                }
            })

            this.frame.addEventListener('dom-ready', async () => {
                // typescript indicates type
                const frame = this.frame as unknown as WebviewTag
                await frame.executeJavaScript(`
                document.addEventListener('click', (e) => {
                    if (e.target instanceof HTMLAnchorElement && e.target.target === '_blank') {
                        e.preventDefault();
                        console.log('open-gate-open:'+e.target.href);
                    }
                });`)
            })
        }

        // Notify all subscribers that the frame is now ready
        // This should only happen once per frame lifecycle
        this.frame.addEventListener('dom-ready', async () => {
            if (!this.isFrameReady) {
                this.isFrameReady = true
                this.frameReadyCallbacks.forEach((callback) => callback())
            }
        })
    }

    onunload(): void {
        this.frame.remove()
        if (this.frame instanceof HTMLIFrameElement) {
        } else {
            this.frame.removeEventListener('will-navigate', this.webViewWillNavigate.bind(this))
        }
        super.onunload()
    }

    webViewWillNavigate(event: Electron.Event, url: string): void {}

    onPaneMenu(menu: Menu, source: string): void {
        super.onPaneMenu(menu, source)
        menu.addItem((item) => {
            item.setTitle('Reload')
            item.setIcon('refresh-ccw')
            item.onClick(() => {
                if (this.frame instanceof HTMLIFrameElement) {
                    this.frame.src = this.frame.src
                } else {
                    this.frame.reload()
                }
            })
        })
        menu.addItem((item) => {
            item.setTitle('Home page')
            item.setIcon('home')
            item.onClick(() => {
                if (this.frame instanceof HTMLIFrameElement) {
                    this.frame.src = this.options?.url ?? 'about:blank'
                } else {
                    this.frame.loadURL(this.options?.url ?? 'about:blank')
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
                    return
                }

                clipboard.writeText(this.frame.getURL())
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
    setUrl(url: string) {
        this.frame.setAttribute('src', url)
    }
}
