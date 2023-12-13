import getDefaultUserAgent from './getDefaultUserAgent'

export const createEmptyGateOption = (): GateFrameOption => {
    return {
        id: '',
        title: '',
        icon: 'globe',
        hasRibbon: true,
        position: 'right',
        profileKey: 'open-gate',
        url: '',
        zoomFactor: 1.0,
        userAgent: getDefaultUserAgent()
    }
}
