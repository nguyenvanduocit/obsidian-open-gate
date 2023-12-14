import { getSvgIcon } from './getSvgIcon'

export const normalizeGateOption = (gate: Partial<GateFrameOption>): GateFrameOption => {
    if (gate.url === '' || gate.url === undefined) {
        throw new Error('URL is required')
    }

    if (gate.id === '' || gate.id === undefined) {
        let seedString = gate.url!
        if (gate.profileKey != undefined && gate.profileKey !== 'open-gate' && gate.profileKey !== '') {
            seedString += gate.profileKey
        }
        gate.id = btoa(seedString)
    }

    if (gate.profileKey === '' || gate.profileKey === undefined) {
        gate.profileKey = 'open-gate'
    }

    if (gate.zoomFactor === 0 || gate.zoomFactor === undefined) {
        gate.zoomFactor = 1
    }

    if (gate.icon === '' || gate.icon === undefined) {
        gate.icon = gate.url?.startsWith('http') ? getSvgIcon(gate.url) : 'globe'
    }

    if (gate.title === '' || gate.title === undefined) {
        gate.title = gate.url
    }

    return <GateFrameOption>gate
}
