using backend.Models;
using backend.Data;
using backend.Dto;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace backend.Services;

public class ApplianceService
{
    private readonly ApplicationContext _context;
    private const string DefaultCategoryName = "General";

    public ApplianceService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<ApplianceSummaryDto> AddApplianceSummaryAsync(AddApplianceSummaryDto dto, Guid userId)
    {
        var category = await GetOrCreateDefaultCategoryAsync();
        var newAppliance = new Appliance
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ApplianceCategoryId = category.Id,
            Name = dto.Name,
            Location = "Unknown",
            RatedWatts = dto.Watts,
            InverterCapable = false
        };

        var (hoursPerDay, daysPerWeek) = ParseStatus(dto.Status);
        var usageLog = new ApplianceUsageLog
        {
            ApplianceId = newAppliance.Id,
            UserId = userId,
            HoursPerDay = hoursPerDay,
            DaysPerWeek = daysPerWeek,
            WeeksPerMonth = 4,
            DaysUsedMask = BuildDaysMask(daysPerWeek),
            AverageWatts = dto.Watts,
            EnergyKwh = dto.MonthlyKwh,
            CostAmount = dto.CostPerMonth,
            Quantity = 1,
            Wattage = dto.Watts
        };

        await _context.Appliances.AddAsync(newAppliance);
        await _context.ApplianceUsageLogs.AddAsync(usageLog);
        await _context.SaveChangesAsync();

        return new ApplianceSummaryDto(
            newAppliance.Id,
            newAppliance.Name,
            FormatStatus(hoursPerDay, daysPerWeek),
            dto.Watts,
            dto.MonthlyKwh,
            dto.CostPerMonth
        );
    }

    public async Task<List<ApplianceSummaryDto>> GetUserApplianceSummariesAsync(Guid userId)
    {
        var appliances = await _context.Appliances
            .Where(a => a.UserId == userId)
            .OrderBy(a => a.Name)
            .ToListAsync();

        var logs = await _context.ApplianceUsageLogs
            .Where(l => l.UserId == userId)
            .ToListAsync();

        var latestLogs = logs
            .GroupBy(l => l.ApplianceId)
            .ToDictionary(g => g.Key, g => g.OrderByDescending(l => l.Id).First());

        return appliances.Select(appliance =>
        {
            latestLogs.TryGetValue(appliance.Id, out var log);
            var hours = log?.HoursPerDay ?? 0m;
            var days = log?.DaysPerWeek ?? 0;
            return new ApplianceSummaryDto(
                appliance.Id,
                appliance.Name,
                FormatStatus(hours, days),
                log?.Wattage ?? appliance.RatedWatts,
                log?.EnergyKwh ?? 0m,
                log?.CostAmount ?? 0m
            );
        }).ToList();
    }

    public async Task<ApplianceSummaryDto?> UpdateApplianceSummaryAsync(Guid applianceId, EditApplianceSummaryDto dto, Guid userId)
    {
        var appliance = await _context.Appliances.FindAsync(applianceId);
        if (appliance == null || appliance.UserId != userId)
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(dto.Name))
        {
            appliance.Name = dto.Name;
        }

        if (dto.Watts.HasValue)
        {
            appliance.RatedWatts = dto.Watts.Value;
        }

        var log = await _context.ApplianceUsageLogs
            .Where(l => l.ApplianceId == applianceId && l.UserId == userId)
            .OrderByDescending(l => l.Id)
            .FirstOrDefaultAsync();

        if (log == null)
        {
            var (hoursPerDay, daysPerWeek) = ParseStatus(dto.Status ?? string.Empty);
            log = new ApplianceUsageLog
            {
                ApplianceId = applianceId,
                UserId = userId,
                HoursPerDay = hoursPerDay,
                DaysPerWeek = daysPerWeek,
                WeeksPerMonth = 4,
                DaysUsedMask = BuildDaysMask(daysPerWeek),
                AverageWatts = dto.Watts ?? appliance.RatedWatts,
                EnergyKwh = dto.MonthlyKwh ?? 0m,
                CostAmount = dto.CostPerMonth ?? 0m,
                Quantity = 1,
                Wattage = dto.Watts ?? appliance.RatedWatts
            };
            await _context.ApplianceUsageLogs.AddAsync(log);
        }
        else
        {
            if (!string.IsNullOrWhiteSpace(dto.Status))
            {
                var (hoursPerDay, daysPerWeek) = ParseStatus(dto.Status);
                log.HoursPerDay = hoursPerDay;
                log.DaysPerWeek = daysPerWeek;
                log.DaysUsedMask = BuildDaysMask(daysPerWeek);
            }

            if (dto.Watts.HasValue)
            {
                log.AverageWatts = dto.Watts.Value;
                log.Wattage = dto.Watts.Value;
            }

            if (dto.MonthlyKwh.HasValue)
            {
                log.EnergyKwh = dto.MonthlyKwh.Value;
            }

            if (dto.CostPerMonth.HasValue)
            {
                log.CostAmount = dto.CostPerMonth.Value;
            }

            _context.ApplianceUsageLogs.Update(log);
        }

        _context.Appliances.Update(appliance);
        await _context.SaveChangesAsync();

        return new ApplianceSummaryDto(
            appliance.Id,
            appliance.Name,
            FormatStatus(log.HoursPerDay, log.DaysPerWeek),
            log.Wattage,
            log.EnergyKwh,
            log.CostAmount
        );
    }

    public async Task<bool> DeleteApplianceAsync(Guid applianceId, Guid userId)
    {
        var appliance = await _context.Appliances.FindAsync(applianceId);
        if (appliance == null || appliance.UserId != userId)
        {
            return false;
        }

        var logs = await _context.ApplianceUsageLogs
            .Where(l => l.ApplianceId == applianceId && l.UserId == userId)
            .ToListAsync();

        if (logs.Count > 0)
        {
            _context.ApplianceUsageLogs.RemoveRange(logs);
        }

        _context.Appliances.Remove(appliance);
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<ApplianceCategory> GetOrCreateDefaultCategoryAsync()
    {
        var category = await _context.ApplianceCategories
            .FirstOrDefaultAsync(c => c.Name == DefaultCategoryName);

        if (category != null)
        {
            return category;
        }

        category = new ApplianceCategory
        {
            Id = Guid.NewGuid(),
            Name = DefaultCategoryName
        };

        await _context.ApplianceCategories.AddAsync(category);
        await _context.SaveChangesAsync();
        return category;
    }

    private static (decimal HoursPerDay, int DaysPerWeek) ParseStatus(string status)
    {
        if (string.IsNullOrWhiteSpace(status))
        {
            return (1m, 1);
        }

        var hoursMatch = Regex.Match(status, @"(?<hours>\d+(?:\.\d+)?)\s*hour", RegexOptions.IgnoreCase);
        var daysMatch = Regex.Match(status, @"(?<days>\d+)\s*day", RegexOptions.IgnoreCase);

        var hours = hoursMatch.Success && decimal.TryParse(hoursMatch.Groups["hours"].Value, out var parsedHours)
            ? parsedHours
            : 1m;
        var days = daysMatch.Success && int.TryParse(daysMatch.Groups["days"].Value, out var parsedDays)
            ? parsedDays
            : 1;

        return (Math.Max(0m, hours), Math.Max(0, Math.Min(days, 7)));
    }

    private static string FormatStatus(decimal hoursPerDay, int daysPerWeek)
    {
        var hoursLabel = hoursPerDay == 1m ? "hour" : "hours";
        var daysLabel = daysPerWeek == 1 ? "day" : "days";
        return $"{hoursPerDay} {hoursLabel} / {daysPerWeek} {daysLabel} / week";
    }

    private static short BuildDaysMask(int daysPerWeek)
    {
        short mask = 0;
        var days = Math.Min(daysPerWeek, 7);
        for (var i = 0; i < days; i++)
        {
            mask |= (short)(1 << i);
        }
        return mask;
    }
}