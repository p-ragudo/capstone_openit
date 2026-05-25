using backend.Models;
using backend.Data;

namespace backend.Services;

public class ApplianceService
{
    private readonly ApplicationContext _context;

    public ApplianceService(ApplicationContext context)
    {
        _context = context;
    }
}