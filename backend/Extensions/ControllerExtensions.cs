using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace backend.Extensions;

public static class ControllerExtensions
{
    public static Guid? GetUserGuid(this ControllerBase controller)
    {
        var userIdString = controller.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out Guid userId))
        {
            return null;
        }

        return userId;
    }

    public static UnauthorizedObjectResult UnauthorizedMessage(this ControllerBase controller)
    {
        return controller.Unauthorized("User context is missing or invalid.");
    }
}