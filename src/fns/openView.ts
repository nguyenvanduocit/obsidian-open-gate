import { Workspace, WorkspaceLeaf } from 'obsidian'
import { GateView } from '../GateView'

export const openView = async (
    workspace: Workspace,
    id: string
): Promise<void> => {
    let leaf: WorkspaceLeaf
    let leafs = workspace.getLeavesOfType(id)
    if (leafs.length == 0) {
        await workspace.getLeaf(false).setViewState({ type: id, active: true })
    }

    leaf = workspace.getLeavesOfType(id)[0]
    workspace.revealLeaf(leaf)

    if (leaf.view instanceof GateView) {
        leaf.view.focus()
    }
}
