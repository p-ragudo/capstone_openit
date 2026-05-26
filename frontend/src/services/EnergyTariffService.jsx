import { requestJson } from "./ApiClient"

export const addEnergyTariffAsync = async (energyTariff) => {
    return requestJson('tariffs', {
        method: 'POST',
        body: JSON.stringify(energyTariff)
    })
}

export const getAllEnergyTariffs = async () => requestJson('tariffs')