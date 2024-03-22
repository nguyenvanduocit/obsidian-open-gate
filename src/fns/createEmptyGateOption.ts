import getDefaultUserAgent from './getDefaultUserAgent'
import { GateFrameOption } from '../GateOptions'

export const createEmptyGateOption = (): GateFrameOption => {
    return {
        id: '',
        title: '',
        icon: '',
        hasRibbon: true,
        position: 'right',
        profileKey: 'open-gate',
        url: '',
        zoomFactor: 1.0,
        userAgent: getDefaultUserAgent()
    }
}
