import { requestJson } from "./ApiClient"

export const AddApplianceUsageLogAsync = async (applianceUsageLog) => {
    return requestJson('appliances/logs', {
        method: 'POST',
        body: JSON.stringify(applianceUsageLog)
    })
}

export const GetAllApplianceUsageLogs = async () => requestJson('appliances/logs')