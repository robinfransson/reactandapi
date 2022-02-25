using System;
using System.Threading.Tasks;
using Backend.Models.Interfaces;

namespace Backend.Models;

public class UserService : IUserService
{
    public Task<bool> Create(CreateUserCommand command)
    {
        throw new System.NotImplementedException();
    }

    public Task<User> Get(string username)
    {
        throw new NotImplementedException();
    }

    public Task<User> Get(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Delete(User user)
    {
        throw new NotImplementedException();
    }
}

public class CreateUserCommand
{
    public string Username { get; set; }
    public string Password { get; set; }
}