/// <reference types="electron" />

declare type GateFrameOptionType = 'left' | 'center' | 'right'

declare type GateFrameOption = {
    id: string
    icon: string
    title: string
    url: string
    profileKey?: string
    hasRibbon?: boolean
    position?: GateFrameOptionType
    userAgent?: string
    zoomFactor?: number
    css?: string
}

interface PluginSetting {
    uuid: string
    gates: Record<string, GateFrameOption>
}

interface MarkdownLink {
    title: string
    url: string
}
