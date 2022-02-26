using System;
using System.Threading.Tasks;

namespace Backend.Models.Interfaces;

public interface IUserService
{
    public Task<bool> Create(CreateUserCommand command);
    public Task<User> Get(string username);
    public Task<User> Get(Guid id);
    public Task<bool> Delete(User user);
}