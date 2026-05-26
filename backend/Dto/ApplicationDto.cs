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

public record AddEnergyTariffDto(
    string UtilityName,
    string Region,
    decimal RatePerKwh,
    DateOnly EffectiveFrom,
    DateOnly EffectiveTo
);