import { requestJson } from "./ApiClient"

export const AddApplianceAsync = async (appliance) => {
    return requestJson('appliances', {
        method: 'POST',
        body: JSON.stringify(appliance)
    })
}

export const GetAllAppliances = async () => requestJson('appliances')