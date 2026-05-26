using backend.Models;
using backend.Data;
using backend.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class CostEstimationService
{
    private readonly ApplicationContext _context;

    public CostEstimationService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<CostEstimation> AddCostEstimationAsync(AddCostEstimationDto dto, Guid userId)
    {
        var newCostEstimation = new CostEstimation
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ApplianceId = dto.ApplianceId,
            TariffId = dto.TariffId,
            ProfileName = dto.ProfileName,
            Wattage = dto.Wattage,
            HoursPerDay = dto.HoursPerDay,
            IsInverter = dto.IsInverter,
            EstimatedMonthlyCost = dto.EstimatedMonthlyCost,
            EstimatedAnnualCost = dto.EstimatedAnnualCost
        };

        await _context.CostEstimations.AddAsync(newCostEstimation);
        await _context.SaveChangesAsync();

        return newCostEstimation;
    }

    public async Task<List<CostEstimation>> GetUserCostEstimationsAsync(Guid userId)
    {
        return await _context.CostEstimations
            .Where(c => c.UserId == userId)
            .ToListAsync();
    }
}