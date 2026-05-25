using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Bill
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateOnly? BillingMonth { get; set; }
    public DateOnly DueDate{ get; set; }

    [Column(TypeName = "decimal(12,2)")]
    public decimal? GenerationAmount { get; set; }

    [Column(TypeName = "decimal(12,2)")]
    public decimal? TransmissionAmount { get; set; }

    [Column(TypeName = "decimal(12,2)")]
    public decimal? DistributionAmount { get; set; }

    [Column(TypeName = "decimal(12,2)")]
    public decimal? GovernmentTaxAmount { get; set; }

    [Column(TypeName = "decimal(12,3)")]
    public decimal EnergyKwh { get; set; }

    // public decimal TotalAmount => GenerationAmount + TransmissionAmount + DistributionAmount + GovernmentTaxAmount;
    [Column(TypeName = "decimal(12,2)")]
    public decimal TotalAmount { get; set; }

    public string? Status { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;


    public ApplicationUser? User { get; set; }
}