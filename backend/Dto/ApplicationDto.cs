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