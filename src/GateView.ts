import { ItemView, WorkspaceLeaf, Menu } from 'obsidian'
import { createWebviewTag } from './fns/createWebviewTag'

export class GateView extends ItemView {
    private readonly options?: GateFrameOption
    private frame: WebviewTag

    constructor(leaf: WorkspaceLeaf, options: GateFrameOption) {
        super(leaf)
        this.navigation = false
        this.options = options
    }

    addActions(): void {
        this.addAction('refresh-ccw', 'Reload', () => {
            this.frame.reload()
        })

        this.addAction('home', 'Home page', () => {
            this.frame.loadURL(this.options?.url ?? 'about:blank')
        })
    }

    onload(): void {
        super.onload()
        this.addActions()
        this.contentEl.empty()
        this.contentEl.addClass('open-gate-view')
        if (this.options?.url) {
            this.frame = createWebviewTag(this.options.url)
        }

        this.contentEl.appendChild(this.frame as unknown as HTMLElement)
    }

    onPaneMenu(menu: Menu, source: string): void {
        super.onPaneMenu(menu, source)
        menu.addItem((item) => {
            item.setTitle('Reload')
            item.setIcon('refresh-ccw')
            item.onClick(() => {
                this.frame.reload()
            })
        })
        menu.addItem((item) => {
            item.setTitle('Home page')
            item.setIcon('home')
            item.onClick(() => {
                this.frame.loadURL(this.options?.url ?? 'about:blank')
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
}
