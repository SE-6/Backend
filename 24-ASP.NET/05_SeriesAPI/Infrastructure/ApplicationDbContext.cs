using Microsoft.EntityFrameworkCore;
using SeriesApi.Models;

namespace SeriesApi.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Series> Series => Set<Series>();

}