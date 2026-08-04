using BlogApi.Dtos.Users;
using BlogApi.Filters;
using BlogApi.Services.Interfaces;

namespace BlogApi.Endpoints;

public static class UserEndpoints
{
    public static RouteGroupBuilder MapUsers(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/users");

        // GET /users
        group.MapGet("/", (IUserService service) =>
        {
            var users = service.List()
                .Select(u => new UserResponseDto(u.Id, u.Name, u.Email, u.CreatedAt));
            return Results.Ok(users);
        });

        // GET /users/{id
        group.MapGet("/{id:guid}", (Guid id, IUserService service) =>
        {
            var user = service.Get(id);
            // if (user is null) return Results.NotFound();
            if (user is null) return Results.NotFound(new { error = "User does not exist" });

            var dto = new UserResponseDto(user.Id, user.Name, user.Email, user.CreatedAt);
            return Results.Ok(dto);
        });

        // POST /users create
        group.MapPost("/", (CreateUserDto dto, IUserService service) =>
        {
            var user = service.Create(dto.Name, dto.Email);
            var response = new UserResponseDto(user.Id, user.Name, user.Email, user.CreatedAt);

            return Results.Created($"/users/{user.Id}", response);
        }).WithValidation<CreateUserDto>(); // the filter runs BEFORE the handler above!

        // DELETE /users/{id}

        group.MapDelete("/{id:guid}", (Guid id, IUserService service) =>
        {
            return service.Delete(id) ? Results.NoContent() : Results.NotFound();
        });

        return group;
    }
}
