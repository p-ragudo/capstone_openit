using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Dto;

namespace backend.Services;

public class ApplianceCategoryService
{
    private readonly ApplicationContext _context;

    public ApplianceCategoryService (ApplicationContext context)
    {
        _context = context;
    }

    public async Task<ApplianceCategory> AddApplianceCategoryAsync(AddApplianceCategoryDto dto)
    {
        var newApplianceCategory = new ApplianceCategory
        {
            Name = dto.Name
        };

        await _context.ApplianceCategories.AddAsync(newApplianceCategory);
        await _context.SaveChangesAsync();

        return newApplianceCategory;
    }

    public async Task<List<ApplianceCategory>> GetApplianceCategoriesAsync() => 
        await _context.ApplianceCategories.ToListAsync();
}