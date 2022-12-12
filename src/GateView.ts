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

    onload(): void {
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
            item.setTitle('support author')
            item.setIcon('globe')
            item.onClick(() => {
                open('https://twitter.com/duocdev')
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

    focus(): void {
        this.frame.focus()
    }
}
