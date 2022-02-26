using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Backend.Models.Interfaces;
using Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public class UserService : IUserService
{
    private readonly LocalDbContext _context;

    public UserService(LocalDbContext context)
    {
        _context = context;
    }

    public async Task<UserServiceStatus> Create(CreateUserCommand command)
    {
        var user =
            await _context.Users.FirstOrDefaultAsync(x => x.Username == command.Username || x.Email == command.Email);

        if (user is not null)
        {
            var emailExists = command.Email == user.Email;
            return new UserServiceStatus()
            {
                Status = StatusCode.Error, 
                Message = emailExists ? "Another user with this email is registered" : "Another user with this username is registered"
            };
        }

        await _context.Users.AddAsync(new User()
        {
            Username = command.Username,
            Email = command.Username,
            Password = Encrypted(command.Password)
        });

        await _context.SaveChangesAsync();

        return new UserServiceStatus()
        {
            Message = "User created successfully",
            Status = StatusCode.Success
        };
    }

    private string Encrypted(string entry)
    {
        var bytes = Encoding.UTF8.GetBytes(entry);
        using var sha = SHA256.Create();
        var passwordBytes = sha.ComputeHash(bytes);
        var encryptedResult = Convert.ToBase64String(passwordBytes);

        return encryptedResult;


    }

    public Task<User> Get(string username)
    {
        throw new NotImplementedException();
    }

    public Task<User> Get(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<UserServiceStatus> Delete(User user)
    {
        throw new NotImplementedException();
    }
}

public class UserServiceStatus
{
    public StatusCode Status { get; set; }
    public string Message { get; set; }
}

public enum StatusCode
{
    Success = 0,
    Error = 1
}