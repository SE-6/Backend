using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using SeriesApi.Endpoints;
using SeriesApi.Infrastructure;
using SeriesApi.Interfaces;
using SeriesApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi(); // DOCUMENTATION
builder.Services.AddScoped<ISeriesService, SeriesServices>();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    if (await db.Database.CanConnectAsync())
        app.Logger.LogInformation("✅ Connected to DB");
    else
        app.Logger.LogInformation("❌ Could not connect to database");

}

app.MapOpenApi();
app.MapScalarApiReference();

app.MapSeries();

app.Logger.LogInformation("OpenAPI JSON: http://localhost:5068/openapi/v1.json");
app.Logger.LogInformation("Scalar UI: http://localhost:5068/scalar/v1");

app.Run();
