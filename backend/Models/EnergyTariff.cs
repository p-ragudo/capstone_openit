using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class EnergyTariff
{
    public Guid Id { get; set; }

    public string UtilityName { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;

    [Column(TypeName = "decimal(12,4)")]
    public decimal RatePerKwh { get; set; }

    public DateOnly EffectiveFrom { get; set; }

    public DateOnly EffectiveTo { get; set; }
}