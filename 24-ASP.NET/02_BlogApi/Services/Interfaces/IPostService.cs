using BlogApi.Models;

namespace BlogApi.Services.Interfaces;

public interface IPostService
{
    Post? Get(Guid id);
    IReadOnlyList<Post> List();
    Post Create(Guid userId, string title, string content);
    bool Delete(Guid id);
}