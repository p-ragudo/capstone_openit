using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class CostEstimation
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid ApplianceId { get; set; }

    public Guid TariffId { get; set; }

    public string ProfileName { get; set; } = string.Empty;

    public int Wattage { get; set; }

    [Column(TypeName = "decimal(6,2)")]
    public decimal HoursPerDay { get; set; }

    public bool IsInverter { get; set; }

    [Column(TypeName = "decimal(12,2)")]
    public decimal EstimatedMonthlyCost { get; set; }

    [Column(TypeName = "decimal(12,2)")]
    public decimal EstimatedAnnualCost { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;


    public ApplicationUser? ApplicationUser { get; set; }
    public Appliance? Appliance { get; set; }
    public EnergyTariff? EnergyTariff { get; set; }
}