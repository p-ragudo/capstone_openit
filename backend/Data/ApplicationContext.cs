using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


namespace backend.Data;

public class ApplicationContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{

    public ApplicationContext() {}
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) {}

    public DbSet<Appliance> Appliances { get; set; }
    public DbSet<ApplianceCategory> ApplianceCategories { get; set; }
    public DbSet<ApplianceUsageLog> ApplianceUsageLogs { get; set; }
    public DbSet<Bill> Bills { get; set; }
    public DbSet<CostEstimation> CostEstimations { get; set; }
    public DbSet<EnergyTariff> EnergyTariffs { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Recommendation> Recommendations { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if(!optionsBuilder.IsConfigured)
        {
            var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__Default")
                ?? "Host=localhost;Port=5432;Database=application;Username=postgres;Password=sqlraine16";
            
            optionsBuilder.UseNpgsql(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}