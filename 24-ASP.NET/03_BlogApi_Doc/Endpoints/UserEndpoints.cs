using BlogApi.Dtos.Users;
using BlogApi.Filters;
using BlogApi.Services.Interfaces;

namespace BlogApi.Endpoints;

public static class UserEndpoints
{
    public static RouteGroupBuilder MapUsers(this IEndpointRouteBuilder routes)
    {
        var group = routes
            .MapGroup("/users")
            .WithTags("Users");

        // GET /users
        group.MapGet("/", (IUserService service) =>
        {
            var users = service.List()
                .Select(u => new UserResponseDto(u.Id, u.Name, u.Email, u.CreatedAt));
            return Results.Ok(users);
        })
        .WithName("ListUsers")
        .WithSummary("Get all users")
        .WithDescription("Returns every user stored by the app")
        .Produces<List<UserResponseDto>>(StatusCodes.Status200OK);

        // GET /users/{id
        group.MapGet("/{id:guid}", (Guid id, IUserService service) =>
        {
            var user = service.Get(id);
            // if (user is null) return Results.NotFound();
            if (user is null) return Results.NotFound(new { error = "User does not exist" });

            var dto = new UserResponseDto(user.Id, user.Name, user.Email, user.CreatedAt);
            return Results.Ok(dto);
        })
        .WithName("GetUserById")
        .WithSummary("Get a User by ID")
        .Produces<UserResponseDto>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status404NotFound);

        // POST /users create
        group.MapPost("/", (CreateUserDto dto, IUserService service) =>
        {
            var user = service.Create(dto.Name, dto.Email);
            var response = new UserResponseDto(user.Id, user.Name, user.Email, user.CreatedAt);

            return Results.Created($"/users/{user.Id}", response);
        })
        .WithSummary("Create a User")
        .WithDescription("Validates the body & creates the user")
        .WithValidation<CreateUserDto>(); // the filter runs BEFORE the handler above!

        // DELETE /users/{id}

        group.MapDelete("/{id:guid}", (Guid id, IUserService service) =>
        {
            return service.Delete(id) ? Results.NoContent() : Results.NotFound();
        });

        return group;
    }
}
