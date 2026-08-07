using Microsoft.EntityFrameworkCore;
using SeriesApi.Dtos;
using SeriesApi.Infrastructure;
using SeriesApi.Interfaces;
using SeriesApi.Models;

namespace SeriesApi.Services;

public interface ISeriesServices
{
    Task<Series> CreateAsync(CreateSeriesDto dto);
    Task<Series?> GetAsync(Guid id);
    Task<IReadOnlyList<Series>> ListAsync();
}

public interface ISeriesServices1
{
    Task<Series> CreateAsync(CreateSeriesDto dto);
    Task<Series?> GetAsync(Guid id);
    Task<IReadOnlyList<Series>> ListAsync();
}

public class SeriesServices : ISeriesService, ISeriesServices, ISeriesServices1
{
    private readonly ApplicationDbContext _db;
    public SeriesServices(ApplicationDbContext db) => _db = db;

    // GET /series
    public async Task<IReadOnlyList<Series>> ListAsync()
        => await _db.Series.ToListAsync();

    // GET /series/{id}
    public async Task<Series?> GetAsync(Guid id)
        => await _db.Series.FindAsync(id);

    // POST /series
    public async Task<Series> CreateAsync(CreateSeriesDto dto)
    {
        var series = new Series
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Genre = dto.Genre,
            TotalSeasons = dto.TotalSeasons,
            Status = dto.Status,
            Rating = dto.Rating,
            CreatedAt = DateTimeOffset.UtcNow
        };

        _db.Series.Add(series);
        await _db.SaveChangesAsync();
        return series;
    }

    //PUT /series
    public async Task<Series?> UpdateAsync(Guid id, UpdateSeriesDto dto)
    {
        var series = await _db.Series.FindAsync(id);
        if (series is null) return null;

        // overwrite only the fields that were provided
        if (!string.IsNullOrEmpty(dto.Title)) series.Title = dto.Title;
        if (!string.IsNullOrEmpty(dto.Genre)) series.Genre = dto.Genre;
        if (dto.TotalSeasons is not null) series.TotalSeasons = dto.TotalSeasons.Value;
        if (dto.Status is not null) series.Status = dto.Status.Value;
        if (dto.Rating is not null) series.Rating = dto.Rating;

        await _db.SaveChangesAsync();
        return series;
    }

    // DELETE /series/{id}
    public async Task<bool> DeleteAsync(Guid id)
    {
        var series = await _db.Series.FindAsync(id);
        if (series is null) return false;

        _db.Series.Remove(series);
        await _db.SaveChangesAsync();
        return true;
    }
}