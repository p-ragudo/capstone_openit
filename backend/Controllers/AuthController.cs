using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        var result = await _authService.RegisterUserAsync(model);
        if(!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        return Ok(new { message = "User registered successfully!" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var result = await _authService.LoginUserAsync(model);
        if(!result.Succeeded)
        {
            return BadRequest(new { message = "Invalid email or password." });
        }
        return Ok(new { message = "Login successful!" });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _authService.LogOutUserAsync();
        return Ok(new { message = "Logged out successfully!" });
    }

    [Authorize]
    [HttpGet("user")]
    public async Task<IActionResult> GetUserInfo()
    {
        var userInfo = await _authService.GetCurrentUserInfoAsync(User);
        if(userInfo == null)
        {
            return NotFound(new { message = "User profile not found." });
        }
        return Ok(userInfo);
    }
}
