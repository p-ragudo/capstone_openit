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
    public async Task<IActionResult> Create([FromBody] AddApplianceSummaryDto request)
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _applianceService.AddApplianceSummaryAsync(request, userId);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetUserAppliances()
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _applianceService.GetUserApplianceSummariesAsync(userId);
        return Ok(result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] EditApplianceSummaryDto request)
    {
        if (this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var updated = await _applianceService.UpdateApplianceSummaryAsync(id, request, userId);
        if (updated == null)
        {
            return NotFound("Appliance not found or you do not have permission to modify it.");
        }

        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        if (this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var removed = await _applianceService.DeleteApplianceAsync(id, userId);
        if (!removed)
        {
            return NotFound("Appliance not found or you do not have permission to remove it.");
        }

        return NoContent();
    }
}