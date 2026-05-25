using Day6.Data;
using Day6.Models;
using Day6.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<StudentEnrollmentContext>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "http://localhost")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddScoped<IStudentsService, StudentsService>();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>(options =>
{
    options.Password.RequiredLength = 8;
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
})
    .AddEntityFrameworkStores<StudentEnrollmentContext>();

var app = builder.Build();

app.UseRouting();
app.UseCors("frontend");
app.UseAuthentication();
app.UseAuthorization();

var retries = 5;
while (retries-- > 0)
{
    try { Seeder.EnsureSeeded(); break; }
    catch (Exception ex) when (retries > 0)
    {
        Console.WriteLine($"DB not ready, retrying... ({ex.Message})");
        Thread.Sleep(3000);
    }
}

app.MapIdentityApi<ApplicationUser>();
app.MapControllers();

app.Run();
