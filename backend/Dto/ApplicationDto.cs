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