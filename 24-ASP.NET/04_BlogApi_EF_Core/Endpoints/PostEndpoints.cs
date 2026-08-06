using BlogApi.Dtos.Posts;
using BlogApi.Filters;
using BlogApi.Services.Interfaces;

namespace BlogApi.Endpoints;

public static class PostEndpoints
{
    public static RouteGroupBuilder MapPosts(this IEndpointRouteBuilder routes)
    {
        var group = routes
            .MapGroup("/posts")
            .WithTags("Posts");

        // GET /posts => list all posts (with author name)
        group.MapGet("/", async (IPostService service) =>
        {
            var posts = await service.ListAsync();

            var response = posts
                .Select(post => new PostResponseDto(
                    post.Id,
                    post.UserId,
                    post.User?.Name ?? "Unknown", // author
                    post.Title,
                    post.Content,
                    post.PublishedAt
                ))
                .ToList();

            return Results.Ok(response);
        })
        .WithName("ListPosts")
        .WithSummary("Get all posts with their authors")
        .WithDescription("Returns every post together with the author's name.")
        .Produces<List<PostResponseDto>>(StatusCodes.Status200OK);


        // GET /posts/{id} => one post, or 404
        group.MapGet("/{id:guid}",
        async (Guid id, IPostService service) =>
        {
            var post = await service.GetAsync(id);

            if (post is null)
            {
                return Results.NotFound(new
                { message = $"Post with ID {id} was not found" });
            }

            var response = new PostResponseDto(
                post.Id,
                post.UserId,
                post.User?.Name ?? "Unknown",
                post.Title,
                post.Content,
                post.PublishedAt
            );

            return Results.Ok(response);
        });


        // GET / Get all post by the given userId // !
        group.MapGet("/user/{userId:guid}",
        async (Guid userId, IPostService service) =>
        {
            var posts = await service.ListByUserAsync(userId);

            var response = posts.Select(post =>
            new PostResponseDto(
                post.Id,
                post.UserId,
                post.User?.Name ?? "Deleted user",
                post.Title,
                post.Content,
                post.PublishedAt
            ))
            .ToList();

            return Results.Ok(response);
        });


        // POST /posts create a validated post
        group.MapPost("/",
            async (
                CreatePostDto dto,
                IPostService postService,
                IUserService userService) =>
        {
            if (dto.UserId is null)
            {
                return Results.BadRequest(new
                {
                    message = "User ID is required."
                });
            }

            var author = await userService.GetAsync(
                dto.UserId.Value
            );

            if (author is null)
            {
                return Results.BadRequest(new
                {
                    message = $"User with ID '{dto.UserId}' does not exist."
                });
            }

            var post = await postService.CreateAsync(
                dto.UserId.Value,
                dto.Title!,
                dto.Content!
            );

            var response = new PostResponseDto(
                post.Id,
                post.UserId,
                author.Name,
                post.Title,
                post.Content,
                post.PublishedAt
            );

            return Results.Created(
                $"/posts/{post.Id}",
                response
            );
        })
        .WithName("CreatePost")
        .WithSummary("Create a post")
        .Produces<PostResponseDto>(StatusCodes.Status201Created)
        .ProducesValidationProblem(StatusCodes.Status400BadRequest)
        .WithValidation<CreatePostDto>();

        // DELETE /posts/{id}
        group.MapDelete("/{id:guid}",
            async (Guid id, IPostService service) =>
        {
            bool deleted = await service.DeleteAsync(id);

            return deleted
                ? Results.NoContent()
                : Results.NotFound(new
                {
                    message =
                        $"Post with ID '{id}' was not found."
                });
        })
        .WithName("DeletePost")
        .WithSummary("Delete a post")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        return group;
    }
}