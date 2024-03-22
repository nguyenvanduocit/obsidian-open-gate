import { GateFrameOption } from './GateOptions'

export interface PluginSetting {
    uuid: string
    gates: Record<string, GateFrameOption>
}

export interface MarkdownLink {
    title: string
    url: string
}
