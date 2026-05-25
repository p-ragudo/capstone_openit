using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Recommendation
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string TipType { get; set; } = string.Empty;

    [Column(TypeName = "decimal(12,2)")]
    public decimal EstimatedSavingsAmount { get; set; }
    public string SavingsUntil { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;


    public ApplicationUser? ApplicationUser { get; set; }
}