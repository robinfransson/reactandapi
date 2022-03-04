using System.Threading.Tasks;
using Database;

namespace Backend.Models.Interfaces;

public interface IRoleManager
{
    Task AddRole(string roleName);
    Task RemoveRole(string roleName);
    Task AddUserToRole(User user, string roleName);
    Task RemoveUserFromRole(User user, string roleName);
}