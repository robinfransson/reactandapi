using System;
using System.Threading.Tasks;
using Database;

namespace Backend.Models.Interfaces;

public interface IUserService
{
    public Task<UserServiceStatus> Create(CreateUserCommand command);
    public Task<User> Get(string username);
    public Task<User> Get(Guid id);
    public Task<UserServiceStatus> Delete(User user);
}