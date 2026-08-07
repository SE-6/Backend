using System.ComponentModel.DataAnnotations;
using SeriesApi.Models;

namespace SeriesApi.Dtos;

public record UpdateSeriesDto(
    [property: StringLength(100, MinimumLength =3)]
    string? Title,

    [property: StringLength(100, MinimumLength =3)]
    string? Genre,

    [property: Range(1,100)]
    int? TotalSeasons,

    WatchStatus? Status,

    int? Rating
);