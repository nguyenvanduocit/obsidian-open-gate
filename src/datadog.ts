import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    clientToken: 'pub12e5bef6f979979109c5689fc13f86a6',
    site: 'datadoghq.com',
    service: 'obsidian-open-gate',
    env: 'prod',
    version: '1.2.1',
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
    beforeSend: (log) => {
        if (log.http && log.http.status_code === 404) {
            return false
        }

        // do not send logs that does not start with "OpenGate"
        if (!log.message.startsWith('OpenGate')) {
            return false
        }
    }
})
