using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace backend.Services;

public class SeedService
{
    private readonly ApplicationContext _context;
    private const string DefaultCategoryName = "General";
    private const string SeedBillStatus = "seed";
    private const string SeedLocation = "Seed";

    private static readonly (string BillDate, string DueDate, decimal Kwh, decimal Amount)[] SeedBills =
    [
        ("April 2026", "May 15", 215m, 980m),
        ("March 2026", "April 15", 238m, 1070m),
        ("February 2026", "March 15", 310m, 1460m),
        ("January 2026", "February 15", 278m, 1280m),
        ("December 2025", "January 15", 322m, 1490m),
        ("November 2025", "December 15", 260m, 1200m),
        ("October 2025", "November 15", 282m, 1300m),
        ("September 2025", "October 15", 258m, 1185m),
        ("August 2025", "September 15", 270m, 1245m),
        ("July 2025", "August 15", 255m, 1175m),
    ];

    private static readonly (string Name, string Status, int Watts, decimal MonthlyKwh, decimal CostPerMonth)[] SeedAppliances =
    [
        ("Air Conditioner", "8 hours / 3 days / week", 1200, 249.6m, 2840m),
        ("Refrigerator", "24 hours / 7 days / week", 180, 129.6m, 1620m),
        ("Smart Home TV", "4 hours / 7 days / week", 120, 51.8m, 1240m),
        ("Washing Machine", "3 hours / 3 days / week", 800, 93.6m, 860m),
        ("Electric Fan", "8 hours / 7 days / week", 70, 80.2m, 698m),
        ("Water Heater", "1 hour / 7 days / week", 2000, 34.6m, 415m),
        ("Electric Stove", "1 hour / 7 days / week", 1500, 25.9m, 311m),
        ("Microwave", "0.5 hours / 5 days / week", 1000, 10.8m, 130m),
        ("Rice Cooker", "1 hour / 7 days / week", 500, 8.6m, 103m),
        ("Desktop Computer", "6 hours / 5 days / week", 250, 32.5m, 390m),
    ];

    private static readonly Dictionary<string, int> MonthMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["January"] = 1,
        ["February"] = 2,
        ["March"] = 3,
        ["April"] = 4,
        ["May"] = 5,
        ["June"] = 6,
        ["July"] = 7,
        ["August"] = 8,
        ["September"] = 9,
        ["October"] = 10,
        ["November"] = 11,
        ["December"] = 12,
    };

    public SeedService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<(int BillsAdded, int AppliancesAdded)> SeedUserDataAsync(Guid userId)
    {
        var billsAdded = 0;
        var appliancesAdded = 0;

        var existingBills = await _context.Bills
            .Where(b => b.UserId == userId)
            .ToListAsync();

        foreach (var seed in SeedBills)
        {
            var billingMonth = ParseBillingMonth(seed.BillDate);
            var dueDate = ParseDueDate(seed.DueDate, billingMonth);

            var exists = existingBills.Any(b =>
                b.BillingMonth == billingMonth &&
                b.TotalAmount == seed.Amount &&
                b.EnergyKwh == seed.Kwh);

            if (exists)
            {
                continue;
            }

            var bill = new Bill
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                BillingMonth = billingMonth,
                DueDate = dueDate,
                GenerationAmount = null,
                TransmissionAmount = null,
                DistributionAmount = null,
                GovernmentTaxAmount = null,
                EnergyKwh = seed.Kwh,
                TotalAmount = seed.Amount,
                Status = SeedBillStatus
            };

            await _context.Bills.AddAsync(bill);
            billsAdded++;
        }

        var category = await GetOrCreateDefaultCategoryAsync();
        var existingAppliances = await _context.Appliances
            .Where(a => a.UserId == userId)
            .ToListAsync();

        foreach (var seed in SeedAppliances)
        {
            var exists = existingAppliances.Any(a => a.Name == seed.Name && a.RatedWatts == seed.Watts);
            if (exists)
            {
                continue;
            }

            var appliance = new Appliance
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                ApplianceCategoryId = category.Id,
                Name = seed.Name,
                Location = SeedLocation,
                RatedWatts = seed.Watts,
                InverterCapable = false
            };

            var (hoursPerDay, daysPerWeek) = ParseStatus(seed.Status);
            var log = new ApplianceUsageLog
            {
                ApplianceId = appliance.Id,
                UserId = userId,
                HoursPerDay = hoursPerDay,
                DaysPerWeek = daysPerWeek,
                WeeksPerMonth = 4,
                DaysUsedMask = BuildDaysMask(daysPerWeek),
                AverageWatts = seed.Watts,
                EnergyKwh = seed.MonthlyKwh,
                CostAmount = seed.CostPerMonth,
                Quantity = 1,
                Wattage = seed.Watts
            };

            await _context.Appliances.AddAsync(appliance);
            await _context.ApplianceUsageLogs.AddAsync(log);
            appliancesAdded++;
        }

        if (billsAdded > 0 || appliancesAdded > 0)
        {
            await _context.SaveChangesAsync();
        }

        return (billsAdded, appliancesAdded);
    }

    public async Task<(int BillsRemoved, int AppliancesRemoved)> RemoveSeedUserDataAsync(Guid userId)
    {
        var bills = await _context.Bills
            .Where(b => b.UserId == userId && b.Status == SeedBillStatus)
            .ToListAsync();

        if (bills.Count > 0)
        {
            _context.Bills.RemoveRange(bills);
        }

        var appliances = await _context.Appliances
            .Where(a => a.UserId == userId && a.Location == SeedLocation)
            .ToListAsync();

        if (appliances.Count > 0)
        {
            var applianceIds = appliances.Select(a => a.Id).ToList();
            var logs = await _context.ApplianceUsageLogs
                .Where(l => l.UserId == userId && applianceIds.Contains(l.ApplianceId))
                .ToListAsync();

            if (logs.Count > 0)
            {
                _context.ApplianceUsageLogs.RemoveRange(logs);
            }

            _context.Appliances.RemoveRange(appliances);
        }

        if (bills.Count > 0 || appliances.Count > 0)
        {
            await _context.SaveChangesAsync();
        }

        return (bills.Count, appliances.Count);
    }

    private static DateOnly ParseBillingMonth(string input)
    {
        var parts = input.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var monthName = parts[0];
        var year = int.Parse(parts[1]);
        var month = MonthMap[monthName];
        return new DateOnly(year, month, 1);
    }

    private static DateOnly ParseDueDate(string input, DateOnly billingMonth)
    {
        var parts = input.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var monthName = parts[0];
        var day = int.Parse(parts[1]);
        var month = MonthMap[monthName];
        var year = month < billingMonth.Month ? billingMonth.Year + 1 : billingMonth.Year;
        return new DateOnly(year, month, day);
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
