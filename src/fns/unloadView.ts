import { removeIcon, Workspace } from 'obsidian'
import { GateFrameOption } from '../GateOptions'

export const unloadView = async (workspace: Workspace, gate: GateFrameOption): Promise<void> => {
    workspace.detachLeavesOfType(gate.id)
    const ribbonIcons = workspace.containerEl.querySelector(`div[aria-label="${gate.title}"]`)
    if (ribbonIcons) {
        ribbonIcons.remove()
    }
}
