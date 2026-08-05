using System.ComponentModel.DataAnnotations;

namespace BlogApi.Dtos.Posts;

public record UpdatePostDto(
    [property: Required]
    [property: StringLength(200, MinimumLength = 1)]
    string? Title,

    [property: Required]
    [property: StringLength(10_000, MinimumLength = 1)]
    string? Content
);