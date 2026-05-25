public record RegisterDto(string Email, string Password, string DisplayName);
public record LoginDto(string Email, string Password);
public record UserInfoDto(Guid Id, string? Email, string DisplayName);