import { requestJson } from "./ApiClient.jsx"

export const addApplianceAsync = async (appliance) => {
    return requestJson('appliances', {
        method: 'POST',
        body: JSON.stringify(appliance)
    })
}

export const getAllAppliances = async () => requestJson('appliances')

export const updateApplianceAsync = async (id, updatedFields) => {
    return requestJson(`appliances/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedFields)
    })
}

export const deleteApplianceAsync = async (id) => {
    return requestJson(`appliances/${id}`, {
        method: 'DELETE'
    })
}