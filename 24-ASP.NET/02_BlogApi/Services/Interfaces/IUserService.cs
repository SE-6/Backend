using BlogApi.Models;

namespace BlogApi.Services.Interfaces;

public interface IUserService
{
    User? Get(Guid id);
    IReadOnlyList<User> List();
    User Create(string name, string email);
    bool Delete(Guid id);
}