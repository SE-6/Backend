namespace SeriesApi.Models;

public enum WatchStatus
{
    PlanToWatch,
    Watching,
    Completed
}

public class Series
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public int TotalSeasons { get; set; }
    public WatchStatus Status { get; set; }
    public int? Rating { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}