using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Dto;
using backend.Extensions;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/appliances/logs")]
public class ApplianceUsageLogsController : ControllerBase
{
    private readonly ApplianceUsageLogService _applianceUsageLogService;

    public ApplianceUsageLogsController(ApplianceUsageLogService applianceUsageLogService)
    {
        _applianceUsageLogService = applianceUsageLogService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddApplianceUsageLogDto request)
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _applianceUsageLogService.AddApplianceUsageLogAsync(request, userId);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetApplianceUsageLogs()
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _applianceUsageLogService.GetUserApplianceUsageLogsAsync(userId);
        return Ok(result);
    }
}