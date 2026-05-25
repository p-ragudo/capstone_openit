namespace backend.Models;

public class Appliance
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid ApplianceCategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public int RatedWatts { get; set; }
    public bool InverterCapable { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;


    public ApplicationUser? ApplicationUser { get; set; }
    public ApplianceCategory? ApplianceCategory { get; set; }
}