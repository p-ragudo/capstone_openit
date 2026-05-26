using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Dto;
using backend.Extensions;

namespace backend.Controllers;

[ApiController]
[Route("api/tariffs")]
public class EnergyTariffsController : ControllerBase
{
    private readonly EnergyTariffService _energyTarrifService;

    public EnergyTariffsController(EnergyTariffService energyTarrifService)
    {
        _energyTarrifService = energyTarrifService;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddEnergyTariffDto request)
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _energyTarrifService.AddEnergyTarrifAsync(request);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetEnergyTariffs()
    {
        var result = await _energyTarrifService.GetEnergyTariffsAsync();
        return Ok(result);
    }
}