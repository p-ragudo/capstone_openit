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

    public async Task<ApplianceUsageLog?> UpdateApplianceUsageLogAsync(long logId, EditApplianceUsageLogDto dto, Guid userId)
{
    var existingLog = await _context.ApplianceUsageLogs.FindAsync(logId);

    if (existingLog == null || existingLog.UserId != userId)
    {
        return null;
    }

    existingLog.ApplianceId = dto.ApplianceId ?? existingLog.ApplianceId;
    existingLog.HoursPerDay = dto.HoursPerDay ?? existingLog.HoursPerDay;
    existingLog.DaysPerWeek = dto.DaysPerWeek ?? existingLog.DaysPerWeek;
    existingLog.WeeksPerMonth = dto.WeeksPerMonth ?? existingLog.WeeksPerMonth;
    existingLog.DaysUsedMask = dto.DaysUsedMask ?? existingLog.DaysUsedMask;
    existingLog.AverageWatts = dto.AverageWatts ?? existingLog.AverageWatts;
    existingLog.Quantity = dto.Quantity ?? existingLog.Quantity;
    existingLog.Wattage = dto.Wattage ?? existingLog.Wattage;

    existingLog.EnergyKwh = existingLog.AverageWatts / 1000m
        * existingLog.HoursPerDay 
        * existingLog.DaysPerWeek 
        * existingLog.WeeksPerMonth 
        * existingLog.Quantity;

    if (dto.EnergyKwh.HasValue) existingLog.EnergyKwh = dto.EnergyKwh.Value;
    if (dto.CostAmount.HasValue) existingLog.CostAmount = dto.CostAmount.Value;

    _context.ApplianceUsageLogs.Update(existingLog);
    await _context.SaveChangesAsync();

    return existingLog;
}
}