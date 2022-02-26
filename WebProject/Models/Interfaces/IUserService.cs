using System;
using System.Threading.Tasks;
using Database;

namespace Backend.Models.Interfaces;

public interface IUserService
{
    public Task<UserServiceStatus> Create(CreateUserCommand command);
    public Task<User> GetByUsername(string username);
    public Task<User> GetByGuid(Guid id);
    public Task<User> GetByEmail(string email);
    public Task<UserServiceStatus> Delete(User user);
    public Task<UserServiceStatus> SignIn(AuthenticateUserCommand command);
}