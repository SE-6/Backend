using SeriesApi.Dtos;
using SeriesApi.Models;

namespace SeriesApi.Interfaces;

public interface ISeriesService
{
    Task<Series?> GetAsync(Guid id);
    Task<IReadOnlyList<Series>> ListAsync();
    Task<Series> CreateAsync(CreateSeriesDto dto);
    Task<Series?> UpdateAsync(Guid id, UpdateSeriesDto dto);
    Task<bool> DeleteAsync(Guid id);
}