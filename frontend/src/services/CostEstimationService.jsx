import { requestJson } from './ApiClient.jsx'

export const addCostEstimation = async (costEstimation) => {
    return requestJson('cost_estimations', {
        method: 'POST',
        body: JSON.stringify(costEstimation)
    })
}

export const getAllCostEstimations = async () => requestJson('cost_estimations')