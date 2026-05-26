import { requestJson } from "./ApiClient"

export const AddApplianceCategoryAsync = async (applianceCategory) => {
    return requestJson('appliances/categories', {
        method: 'POST',
        body: JSON.stringify(applianceCategory)
    })
}

export const GetAllApplianceCategories = async () => requestJson('appliances/categories')