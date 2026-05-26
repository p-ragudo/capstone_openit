using backend.Models;
using backend.Data;
using backend.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ApplianceService
{
    private readonly ApplicationContext _context;

    public ApplianceService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Appliance> AddApplianceAsync(AddApplianceDto dto, Guid userId)
    {
        var newAppliance = new Appliance
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ApplianceCategoryId = dto.ApplianceCategoryId,
            Name = dto.Name,
            Location = dto.Location,
            RatedWatts = dto.RatedWatts,
            InverterCapable = dto.InverterCapable
        };

        await _context.Appliances.AddAsync(newAppliance);
        await _context.SaveChangesAsync();

        return newAppliance;
    }

    public async Task<List<Appliance>> GetUserAppliancesAsync(Guid userId)
    {
        return await _context.Appliances
            .Where(a => a.UserId == userId)
            .OrderBy(a => a.Name)
            .ToListAsync();
    }
}