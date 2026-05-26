import { requestJson } from "./ApiClient"

export const addApplianceCategoryAsync = async (applianceCategory) => {
    return requestJson('appliances/categories', {
        method: 'POST',
        body: JSON.stringify(applianceCategory)
    })
}

export const getAllApplianceCategories = async () => requestJson('appliances/categories')