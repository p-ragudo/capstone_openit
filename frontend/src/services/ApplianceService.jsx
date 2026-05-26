import { requestJson } from "./ApiClient"

export const addApplianceAsync = async (appliance) => {
    return requestJson('appliances', {
        method: 'POST',
        body: JSON.stringify(appliance)
    })
}

export const getAllAppliances = async () => requestJson('appliances')