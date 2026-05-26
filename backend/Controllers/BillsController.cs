using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Dto;
using backend.Extensions;

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
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _billService.AddBillAsync(request, userId);
        return Ok(result);  
    }

    [HttpGet]
    public async Task<IActionResult> GetUserBills()
    {
        if(this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var result = await _billService.GetUserBillsAsync(userId);
        return Ok(result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] EditBillDto request)
    {
        if (this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var updatedBill = await _billService.UpdateBillAsync(id, request, userId);

        if (updatedBill == null)
        {
            return NotFound("Bill not found or you do not have permission to modify it.");
        }

        return Ok(updatedBill);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        if (this.GetUserGuid() is not Guid userId)
        {
            return this.UnauthorizedMessage();
        }

        var removed = await _billService.DeleteBillAsync(id, userId);
        if (!removed)
        {
            return NotFound("Bill not found or you do not have permission to remove it.");
        }

        return NoContent();
    }
}