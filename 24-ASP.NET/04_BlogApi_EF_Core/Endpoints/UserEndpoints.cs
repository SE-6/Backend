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
        group.MapGet("/", async (IUserService service) =>
        {
            var users = await service.ListAsync();
            var response = users.Select(user =>
            new UserResponseDto(
                user.Id,
                user.Name,
                user.Email,
                user.CreatedAt
            ))
            .ToList();

            return Results.Ok(response);

        })
        .WithName("ListUsers")
        .WithSummary("Get all users")
        .WithDescription("Returns every user stored by the app")
        .Produces<List<UserResponseDto>>(StatusCodes.Status200OK);

        // GET /users/{id
        group.MapGet("/{id:guid}",
        async (Guid id, IUserService service) =>
        {
            var user = await service.GetAsync(id);
            if (user is null) return Results.NotFound(new { error = "User does not exist" });

            var response = new UserResponseDto(
             user.Id,
             user.Name,
             user.Email,
             user.CreatedAt
            );

            return Results.Ok(response);

        })
        .WithName("GetUserById")
        .WithSummary("Get a User by ID")
        .Produces<UserResponseDto>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status404NotFound);

        // POST /users create
        group.MapPost("/",
        async (CreateUserDto dto, IUserService service) =>
        {
            var user = await service.CreateAsync(dto.Name, dto.Email);
            var response = new UserResponseDto(
                user.Id,
                user.Name,
                user.Email,
                user.CreatedAt);

            return Results.Created($"/users/{user.Id}", response);
        })
        .WithSummary("Create a User")
        .WithDescription("Validates the body & creates the user")
        .WithValidation<CreateUserDto>(); // the filter runs BEFORE the handler above!

        // DELETE /users/{id}

        group.MapDelete("/{id:guid}",
        async (Guid id, IUserService service) =>
        {
            bool deleted = await service.DeleteAsync(id);

            return deleted
            ? Results.NoContent()
            : Results.NotFound();
        });

        return group;
    }
}
