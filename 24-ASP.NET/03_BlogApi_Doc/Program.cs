using BlogApi.Endpoints;
using BlogApi.Services;
using BlogApi.Services.Interfaces;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Register services (interface + implementation)
builder.Services.AddOpenApi();
builder.Services.AddSingleton<IUserService, InMemoryUserService>();
builder.Services.AddSingleton<IPostService, InMemoryPostService>();

var app = builder.Build();

app.MapOpenApi();
app.MapScalarApiReference();

app.MapUsers();
app.MapPosts();

app.Logger.LogInformation("OpenAPI JSON: http://localhost:5000/openapi/v1.json");
app.Logger.LogInformation("Scalar UI: http://localhost:5000/scalar/v1");


app.Run();