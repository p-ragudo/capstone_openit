using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Dto;
using backend.Extensions;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/cost_estimations")]
public class CostEstimationsController : ControllerBase
{
    private readonly CostEstimationService _costEstimationService;

    public CostEstimationsController(CostEstimationService costEstimationService)
    {
        _costEstimationService = costEstimationService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddCostEstimationDto request)
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _costEstimationService.AddCostEstimationAsync(request, userId);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetUserCostEstimations()
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _costEstimationService.GetUserCostEstimationsAsync(userId);
        return Ok(result);
    }
}