import { Workspace, WorkspaceLeaf } from 'obsidian'

export const openView = async (
    workspace: Workspace,
    id: string,
    position?: GateFrameOptionType
): Promise<void> => {
    let leaf: WorkspaceLeaf
    let leafs = workspace.getLeavesOfType(id)
    if (leafs.length > 0) {
        workspace.revealLeaf(leafs[0])
        return
    }

    leaf = await createView(workspace, id, position)
    workspace.revealLeaf(leaf)
    return
}

const createView = async (
    workspace: Workspace,
    id: string,
    position?: GateFrameOptionType
) => {
    let leaf: WorkspaceLeaf | undefined
    switch (position) {
        case 'left':
            leaf = workspace.getLeftLeaf(false)
            break
        case 'center':
            leaf = workspace.getLeaf(false)
            break
        case 'right':
        default:
            leaf = workspace.getRightLeaf(false)
            break
    }
    await leaf?.setViewState({ type: id, active: true })
    return leaf
}
