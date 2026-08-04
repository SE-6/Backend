using BlogApi.Endpoints;
using BlogApi.Services;
using BlogApi.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Register services (interface + implementation)
builder.Services.AddSingleton<IUserService, InMemoryUserService>();


var app = builder.Build();


app.MapUsers();
app.Run();


