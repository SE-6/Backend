using SeriesApi.Dtos;
using SeriesApi.Filters;
using SeriesApi.Interfaces;

namespace SeriesApi.Endpoints;

public static class SeriesEndpoints
{
    public static RouteGroupBuilder MapSeries(this IEndpointRouteBuilder routes)
    {
        var group = routes
        .MapGroup("/series")
        .WithTags("Series");

        // GET /series => LIST ALL
        group.MapGet("/", async (ISeriesService service) =>
        {
            var series = await service.ListAsync();

            var response = series.Select(s => new SeriesResponseDto(
                s.Id,
                s.Title,
                s.Genre,
                s.TotalSeasons,
                s.Status,
                s.Rating,
                s.CreatedAt
            ));

            return Results.Ok(response);
        })
        .WithName("ListSeries")
        .WithSummary("Get all series")
        .WithDescription("Returns every series in the watchlist");

        // GET /series/{id} 
        group.MapGet("/{id:guid}", async (Guid id, ISeriesService service) =>
        {
            var series = await service.GetAsync(id);
            if (series is null)
                return Results.NotFound(new { message = $"Series with ID {id} was not found" });

            var response = new SeriesResponseDto(
                series.Id,
                series.Title,
                series.Genre,
                series.TotalSeasons,
                series.Status,
                series.Rating,
                series.CreatedAt
            );

            return Results.Ok(response);
        })
        .WithName("GetSeriesById")
        .WithSummary("Get a series by ID")
        .WithDescription("Returns one series, or 404 if the ID doesn't exist.")
        .Produces<SeriesResponseDto>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status404NotFound);

        // POST /series
        group.MapPost("/", async (CreateSeriesDto dto, ISeriesService service) =>
        {
            var series = await service.CreateAsync(dto);

            var response = new SeriesResponseDto
            (
                series.Id,
                series.Title,
                series.Genre,
                series.TotalSeasons,
                series.Status,
                series.Rating,
                series.CreatedAt
            );

            return Results.Created($"/series/{series.Id}", response);
        })
        .WithValidation<CreateSeriesDto>()
        .WithName("CreateSeries")
        .WithSummary("Add a new series")
        .WithDescription("Creates a series. Returns 400 if validation fails")
        .Produces<SeriesResponseDto>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest);

        // PUT /series/{id} — validated
        group.MapPut("/{id:guid}", async (Guid id, UpdateSeriesDto dto, ISeriesService service) =>
        {
            var series = await service.UpdateAsync(id, dto);
            if (series is null)
                return Results.NotFound(new { message = $"Series with ID '{id}' was not found." });

            var response = new SeriesResponseDto(
                series.Id,
                series.Title,
                series.Genre,
                series.TotalSeasons,
                series.Status,
                series.Rating,
                series.CreatedAt
            );

            return Results.Ok(response);
        })
        .WithValidation<UpdateSeriesDto>()
        .WithName("UpdateSeries")
        .WithSummary("Update a series")
        .WithDescription("Updates the given fields of a series, or 404 if it doesn't exist.");

        // DELETE /series/{id}
        group.MapDelete("/{id:guid}", async (Guid id, ISeriesService service) =>
        {
            return await service.DeleteAsync(id)
                ? Results.Ok(new { message = "Series was removed." })
                : Results.NotFound(new { message = $"Series with ID '{id}' was not found." });
        })
        .WithName("DeleteSeries")
        .WithSummary("Delete a series")
        .WithDescription("Removes a series, or 404 if the ID doesn't exist.");

        return group;
    }
}