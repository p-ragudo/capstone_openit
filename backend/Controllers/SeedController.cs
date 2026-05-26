using backend.Extensions;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SeedController : ControllerBase
{
    private readonly SeedService _seedService;

    public SeedController(SeedService seedService)
    {
        _seedService = seedService;
    }

    [HttpPost("apply")]
    public async Task<IActionResult> Apply()
    {
        if (this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var (billsAdded, appliancesAdded) = await _seedService.SeedUserDataAsync(userId);
        return Ok(new { billsAdded, appliancesAdded });
    }

    [HttpDelete("remove")]
    public async Task<IActionResult> Remove()
    {
        if (this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var (billsRemoved, appliancesRemoved) = await _seedService.RemoveSeedUserDataAsync(userId);
        return Ok(new { billsRemoved, appliancesRemoved });
    }
}
