declare type WebviewTag = {
    setAttribute(allowpopups: string, attr: string): void
    reload(): void
    loadURL(pageUrl: string): void
    goBack(): void
    goForward(): void
    isDevToolsOpened(): boolean
    openDevTools(): void
    closeDevTools(): void
    getURL(): string
    focus(): void
    addClass(cls: string): void
}

declare type GateFrameOptionType = 'left' | 'center' | 'right'

declare type GateFrameOption = {
    id: string
    icon: string
    title: string
    url: string
    hasRibbon?: boolean
    position?: GateFrameOptionType
}
