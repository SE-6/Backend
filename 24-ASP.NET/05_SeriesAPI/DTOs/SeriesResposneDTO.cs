using SeriesApi.Models;

namespace SeriesApi.Dtos;

public record SeriesResponseDto(
    Guid id,
    string Title,
    string Genre,
    int TotalSeasons,
    WatchStatus Status,
    int? Rating,
    DateTimeOffset CreatedAt
);