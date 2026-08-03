public static class UserEndpoints
{
    public static RouteGroupBuilder MapUsers(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/users");

        group.MapGet("/", () => new[] { "Jochen", "Ali" });
        group.MapPost("/", () => $"Hello");


        return group;
    }

}

