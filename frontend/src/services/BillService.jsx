import { requestJson } from './ApiClient.jsx'

export const addBill = async (bill) => {
    return requestJson('bills', {
        method: 'POST',
        body: JSON.stringify(bill)
    })
}

export const getAllBills = async () => requestJson('bills')

export const updateBill = async (id, updatedFields) => {
    return requestJson(`bills/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedFields)
    })
}