using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Dto;
using backend.Extensions;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AppliancesController : ControllerBase
{
    private readonly ApplianceService _applianceService;

    public AppliancesController(ApplianceService applianceService)
    {
        _applianceService = applianceService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddApplianceDto request)
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _applianceService.AddApplianceAsync(request, userId);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetUserAppliances()
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _applianceService.GetUserAppliancesAsync(userId);
        return Ok(result);
    }
}