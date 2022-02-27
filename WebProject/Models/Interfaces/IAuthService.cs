using System.Threading.Tasks;
using Database;

namespace Backend.Models.Interfaces;

public interface IAuthService
{
    Task<AuthToken> GenerateAuthToken(string username);
    Task<bool> CheckValid(string authToken);
    Task InvalidateToken(string token);
}