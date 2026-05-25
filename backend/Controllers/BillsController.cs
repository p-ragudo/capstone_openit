using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BillsController : ControllerBase
{
    private readonly BillService _billService;

    public BillsController(BillService billService)
    {
        _billService = billService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddBillDto request)
    {
        if(GetUserGuid() is not Guid userId)
        {
            return UnauthorizedMessage();
        }

        var result = await _billService.AddBillAsync(request, userId);
        return Ok(result);  
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        if(GetUserGuid() is not Guid userId)
        {
            return UnauthorizedMessage();
        }

        var result = await _billService.GetUserBillsAsync(userId);
        return Ok(result);
    }



    private Guid? GetUserGuid()
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if(string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out Guid userId))
        {
            return null;
        }

        return userId;
    }

    private UnauthorizedObjectResult UnauthorizedMessage() => Unauthorized("User context is missing or invalid.");
}