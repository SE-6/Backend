using BlogApi.Infrastructure;
using BlogApi.Models;
using BlogApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Services;

public class PostService : IPostService
{
    private readonly ApplicationDbContext _db;
    public PostService(ApplicationDbContext db) => _db = db;

    // GET /posts/{id}
    public async Task<Post?> GetAsync(Guid id)
        => await _db.Posts
        .Include(post => post.User)
        .FirstOrDefaultAsync(post => post.Id == id);

    // GET /posts — all posts
    public async Task<IReadOnlyList<Post>> ListAsync()
     => await _db.Posts
         .Include(post => post.User)
         .ToListAsync();

    // GET /users/{userId}/posts — only ONE user's posts (filtered with Where)
    // RETURN AWAIT! => +there is no behavioral difference. 
    // we only change from the short expression to the normal block (easier to read that way)
    public async Task<IReadOnlyList<Post>> ListByUserAsync(Guid userId)
    {
        return await _db.Posts
            .Include(post => post.User)
            .Where(post => post.UserId == userId)
            .ToListAsync();
    }

    // POST /posts — create a new post
    public async Task<Post> CreateAsync(Guid userId, string title, string content)
    {
        // rule: the author must exist
        var userExists = await _db.Users.AnyAsync(u => u.Id == userId);
        if (!userExists)
            throw new ArgumentException("User not found", nameof(userId));

        var post = new Post
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Title = title,
            Content = content,
            PublishedAt = DateTimeOffset.UtcNow
        };

        _db.Posts.Add(post);
        await _db.SaveChangesAsync();
        return post;
    }

    // PUT /posts/{id}
    public async Task<Post?> UpdateAsync(Guid id, string? title, string? content)
    {
        var post = await _db.Posts.FindAsync(id);
        if (post is null) return null;

        if (!string.IsNullOrWhiteSpace(title)) post.Title = title;
        if (!string.IsNullOrWhiteSpace(content)) post.Content = content;

        await _db.SaveChangesAsync();
        return post;
    }

    // DELETE /posts/{id}
    public async Task<bool> DeleteAsync(Guid id)
    {
        var post = await _db.Posts.FindAsync(id);
        if (post is null) return false;

        _db.Posts.Remove(post);
        await _db.SaveChangesAsync();
        return true;
    }
}