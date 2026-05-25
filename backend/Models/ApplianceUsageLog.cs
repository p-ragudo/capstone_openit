using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class ApplianceUsageLog
{
    public long Id { get; set; }

    public Guid ApplianceId { get; set; }

    [Column(TypeName = "decimal(6,2)")]
    public decimal HoursPerDay { get; set; }

    public int DaysPerWeek { get; set; }

    public int WeeksPerMonth { get; set; }

    public short DaysUsedMask { get; set; }

    public int AverageWatts { get; set; }

    [Column(TypeName = "decimal(12,3)")]
    public decimal EnergyKwh { get; set; }

    [Column(TypeName = "decimal(12,2)")]
    public decimal CostAmount { get; set; }


    public Appliance? Appliance { get; set; }
}