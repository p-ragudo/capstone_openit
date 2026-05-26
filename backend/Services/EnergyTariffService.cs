using backend.Models;
using backend.Data;
using backend.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class EnergyTariffService
{
    private readonly ApplicationContext _context;

    public EnergyTariffService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<EnergyTariff> AddEnergyTarrifAsync(AddEnergyTariffDto dto)
    {
        var newEnergyTarrif = new EnergyTariff
        {
            Id = Guid.NewGuid(),
            UtilityName = dto.UtilityName,
            Region = dto.Region,
            RatePerKwh = dto.RatePerKwh,
            EffectiveFrom = dto.EffectiveFrom,
            EffectiveTo = dto.EffectiveTo
        };

        await _context.EnergyTariffs.AddAsync(newEnergyTarrif);
        await _context.SaveChangesAsync();

        return newEnergyTarrif;
    }

    public async Task<List<EnergyTariff>> GetEnergyTariffsAsync() => await _context.EnergyTariffs.ToListAsync();
}