import { getSvgIcon } from './getSvgIcon'

export const normalizeGateOption = (gate: GateFrameOption): GateFrameOption => {
    if (gate.id === '') {
        let seedString = gate.url
        if (gate.profileKey !== 'open-gate' && gate.profileKey !== '') {
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

    if (gate.icon === '') {
        gate.icon = getSvgIcon(gate.url)
    }
    if (gate.title === '') {
        gate.title = gate.url
    }
    return gate
}
