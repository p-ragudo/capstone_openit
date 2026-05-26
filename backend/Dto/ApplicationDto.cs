namespace backend.Dto;

public record AddBillDto(
    DateOnly? BillingMonth,
    DateOnly DueDate,
    decimal? GenerationAmount,
    decimal? TransmissionAmount,
    decimal? DistributionAmount,
    decimal? GovernmentTaxAmount,
    decimal EnergyKwh,
    decimal TotalAmount,
    string? Status
);

public record EditBillDto(
    DateOnly? BillingMonth,
    DateOnly? DueDate,
    decimal? GenerationAmount,
    decimal? TransmissionAmount,
    decimal? DistributionAmount,
    decimal? GovernmentTaxAmount,
    decimal? EnergyKwh,
    decimal? TotalAmount,
    string? Status
);

public record AddApplianceCategoryDto(string Name);

public record AddApplianceDto(
    Guid ApplianceCategoryId,
    string Name,
    string Location,
    int RatedWatts,
    bool InverterCapable
);

public record AddApplianceUsageLogDto(
    Guid ApplianceId,
    decimal HoursPerDay,
    int DaysPerWeek,
    int WeeksPerMonth,
    short DaysUsedMask,
    int AverageWatts,
    decimal EnergyKwh,
    decimal CostAmount,
    int Quantity,
    int Wattage
);

public record EditApplianceUsageLogDto(
    Guid? ApplianceId,
    decimal? HoursPerDay,
    int? DaysPerWeek,
    int? WeeksPerMonth,
    short? DaysUsedMask,
    int? AverageWatts,
    decimal? EnergyKwh,
    decimal? CostAmount,
    int? Quantity,
    int? Wattage
);

public record AddEnergyTariffDto(
    string UtilityName,
    string Region,
    decimal RatePerKwh,
    DateOnly EffectiveFrom,
    DateOnly EffectiveTo
);

public record AddCostEstimationDto(
    Guid ApplianceId,
    Guid TariffId,
    string ProfileName,
    int Wattage,
    decimal HoursPerDay,
    bool IsInverter,
    decimal EstimatedMonthlyCost,
    decimal EstimatedAnnualCost
);

public record AddApplianceSummaryDto(
    string Name,
    string Status,
    int Watts,
    decimal MonthlyKwh,
    decimal CostPerMonth
);

public record EditApplianceSummaryDto(
    string? Name,
    string? Status,
    int? Watts,
    decimal? MonthlyKwh,
    decimal? CostPerMonth
);

public record ApplianceSummaryDto(
    Guid Id,
    string Name,
    string Status,
    int Watts,
    decimal MonthlyKwh,
    decimal CostPerMonth
);