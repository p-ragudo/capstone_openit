using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/appliances/categories")]
public class ApplianceCategoriesController : ControllerBase
{
    private readonly ApplianceCategoryService _categoryService;

    public ApplianceCategoriesController(ApplianceCategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddApplianceCategoryDto request)
    {
        var result = await _categoryService.AddApplianceCategoryAsync(request.Name);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _categoryService.GetApplianceCategoriesAsync();
        return Ok(result);
    }
}