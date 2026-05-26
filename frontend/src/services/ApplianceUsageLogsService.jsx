import { requestJson } from "./ApiClient"

export const addApplianceUsageLogAsync = async (applianceUsageLog) => {
    return requestJson('appliances/logs', {
        method: 'POST',
        body: JSON.stringify(applianceUsageLog)
    })
}

export const getAllApplianceUsageLogs = async () => requestJson('appliances/logs')

export const updateApplianceUsageLog = async (id, updatedFields) => {
    return requestJson(`appliances/logs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedFields)
    })
}