using Microsoft.EntityFrameworkCore;
using BlogApi.Models;

namespace BlogApi.Infrastructure;

public class ApplicationDbContext : DbContext
{
    // the constructor receives the DB settings (which provider + which connection string)
    // and hands them up to the base DbContext. We set these up later in Program.cs.
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    // each DbSet<T> is one table. This line means "there is a Users/Posts table, made of User/Posts rows."
    public DbSet<User> Users => Set<User>();
    public DbSet<Post> Posts => Set<Post>();
}