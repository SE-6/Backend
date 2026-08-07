using System.ComponentModel.DataAnnotations;
using SeriesApi.Models;

namespace SeriesApi.Dtos;

public record CreateSeriesDto(
    [property: Required]
    [property: StringLength(100, MinimumLength =3)]
    string Title,

    [property: Required]
    [property: StringLength(100, MinimumLength =3)]
    string Genre,

    [property: Range(1,100)]
    int TotalSeasons,

    [property: Required]
    WatchStatus Status,

    [property: Range(1, 10)]
    int? Rating
);