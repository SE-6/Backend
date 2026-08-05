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
        group.MapGet("/", (IPostService service, IUserService userService) =>
        {
            var posts = service.List().Select(post =>
            {
                // look up the author for this post (manual "populate")
                var author = userService.Get(post.UserId);

                return new PostResponseDto(
                    post.Id,
                    post.UserId,
                    author?.Name ?? "Unknown", // user deleted? fall back
                    post.Title,
                    post.Content,
                    post.PublishedAt
                );
            });

            return Results.Ok(posts);
        });


        // GET /posts/{id} => one post, or 404
        group.MapGet("/{id:guid}", (Guid id, IPostService service, IUserService userService) =>
        {
            var post = service.Get(id);

            if (post is null)
            {
                return Results.NotFound(new
                {
                    message = $"Post with ID '{id}' was not found."
                });
            }

            // look up the author for this post
            var author = userService.Get(post.UserId);

            var response = new PostResponseDto(
                post.Id,
                post.UserId,
                author?.Name ?? "Unknown",
                post.Title,
                post.Content,
                post.PublishedAt
            );

            return Results.Ok(response);
        });

        // POST /posts create a validated post
        group.MapPost("/", (CreatePostDto dto, IPostService postService, IUserService userService) =>
        {
            // does the user actually exist?
            var author = userService.Get(dto.UserId!.Value);
            if (author is null)
            {
                return Results.BadRequest(new
                {
                    message = $"User with ID '{dto.UserId}' does not exist."
                });
            }

            var post = postService.Create(dto.UserId.Value, dto.Title, dto.Content);

            var response = new PostResponseDto(
                post.Id,
                post.UserId,
                author.Name, // we already fetched the author above => reuse it
                post.Title,
                post.Content,
                post.PublishedAt
            );

            return Results.Created($"/posts/{post.Id}", response);
        }).WithValidation<CreatePostDto>();

        // DELETE /posts/{id}
        group.MapDelete("/{id:guid}", (Guid id, IPostService service) =>
        {
            return service.Delete(id)
                ? Results.NoContent()
                : Results.NotFound(new
                {
                    message = $"Post with ID '{id}' was not found."
                });
        });

        return group;
    }
}