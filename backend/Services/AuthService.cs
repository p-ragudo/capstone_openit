using System.Security.Claims;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Services;

public class AuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<IdentityResult> RegisterUserAsync(RegisterDto model)
    {
        var user = new ApplicationUser
        {
            DisplayName = model.DisplayName,
            Email = model.Email,
            UserName = model.Email
        };

        return await _userManager.CreateAsync(user, model.Password);
    }


    public async Task<SignInResult> LoginUserAsync(LoginDto model)
    {
        return await _signInManager.PasswordSignInAsync(
            model.Email,
            model.Password,
            isPersistent: true,
            lockoutOnFailure: false
        );
    }

    public async Task LogOutUserAsync()
    {
        await _signInManager.SignOutAsync();
    }

    public async Task<UserInfoDto?> GetCurrentUserInfoAsync(ClaimsPrincipal claimsPrincipal)
    {
        var userId = _userManager.GetUserId(claimsPrincipal);
        if(userId == null) return null;

        var user = await _userManager.FindByIdAsync(userId);
        if(user == null) return null;

        return new UserInfoDto(user.Id, user.Email, user.DisplayName);
    }
}