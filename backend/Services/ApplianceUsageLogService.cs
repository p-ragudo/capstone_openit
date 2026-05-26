using backend.Models;
using backend.Data;
using backend.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ApplianceUsageLogService
{
    private readonly ApplicationContext _context;

    public ApplianceUsageLogService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<ApplianceUsageLog> AddApplianceUsageLogAsync(AddApplianceUsageLogDto dto, Guid userId)
    {
        var newApplianceUsageLog = new ApplianceUsageLog
        {
            UserId = userId,
            ApplianceId = dto.ApplianceId,
            HoursPerDay = dto.HoursPerDay,
            DaysPerWeek = dto.DaysPerWeek,
            WeeksPerMonth = dto.WeeksPerMonth,
            DaysUsedMask = dto.DaysUsedMask,
            AverageWatts = dto.AverageWatts,
            EnergyKwh = dto.EnergyKwh,
            CostAmount = dto.CostAmount,
            Quantity = dto.Quantity,
            Wattage = dto.Wattage
        };

        await _context.ApplianceUsageLogs.AddAsync(newApplianceUsageLog);
        await _context.SaveChangesAsync();

        return newApplianceUsageLog;
    }

    public async Task<List<ApplianceUsageLog>> GetUserApplianceUsageLogsAsync(Guid userId)
    {
        return await _context.ApplianceUsageLogs
            .Where(a => a.UserId == userId)
            .OrderBy(a => a.Id)
            .ToListAsync();
    }
}