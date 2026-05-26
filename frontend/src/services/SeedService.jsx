import { requestJson } from './ApiClient.jsx'

export const applySeedData = async () => {
    return requestJson('seed/apply', { method: 'POST' })
}

export const removeSeedData = async () => {
    return requestJson('seed/remove', { method: 'DELETE' })
}
