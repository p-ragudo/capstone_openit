import { requestJson } from "./ApiClient"

export const AddEnergyTariffAsync = async (energyTariff) => {
    return requestJson('tariffs', {
        method: 'POST',
        body: JSON.stringify(energyTariff)
    })
}

export const GetAllEnergyTariffs = async () => requestJson('tariffs')