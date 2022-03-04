using System.Threading.Tasks;
using Database;

namespace Backend.Models.Interfaces;

public interface IAuthService
{
    bool IsInRole(User user, string role);
    Task<AuthToken> GenerateAuthToken(string username);
    Task<bool> CheckValid(string authToken);
    Task InvalidateToken(string token);
    Task<User> GetAuthenticatedUser(string token);
}