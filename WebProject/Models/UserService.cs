using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Backend.Helpers;
using Backend.Models.Interfaces;
using Backend.Validators;
using Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public class UserService : IUserService
{
    private readonly LocalDbContext _context;
    private readonly CreateUserValidator _userValidator;

    public UserService(LocalDbContext context, CreateUserValidator userValidator)
    {
        _context = context;
        _userValidator = userValidator;
    }

    public async Task<UserServiceStatus> Create(CreateUserCommand command)
    {
        var validationResult = await _userValidator.ValidateAsync(command);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(x => x.ErrorMessage);
            var response = new UserServiceStatus()
            {
                Status = StatusCode.Error,
                Message = string.Join("\n", errors)
            };
            return response;
        }
        
        var user =
            await _context.Users
                .FirstOrDefaultAsync(x => x.Username == command.Username || x.Email == command.Email);

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
            Password = command.Password.Encrypt()
        });

        await _context.SaveChangesAsync();

        return new UserServiceStatus()
        {
            Message = "User created successfully",
            Status = StatusCode.Success
        };
    }

    public async Task<User> GetByUsername(string username)
    {
        return await  _context.Users.FirstOrDefaultAsync(x => x.Username == username);
    }
    
    public async Task<User> GetByEmail(string email)
    {
        return await  _context.Users.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<User> GetByGuid(Guid id)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<UserServiceStatus> Delete(User user)
    {
        try
        {
            _context.Users.Remove(user);
            return await Task.FromResult(new UserServiceStatus()
            {
                Status = StatusCode.Success,
                Message = $"Successfully removed the user {user.Username} ({user.Id})."
            });
        }
        catch (Exception e)
        {
            return await Task.FromResult(new UserServiceStatus()
            {
                Status = StatusCode.Error,
                Message = $"An error occured when removing the user {user.Username} ({user.Id})."
            });
        }
    }

    public async Task<UserServiceStatus> SignIn(AuthenticateUserCommand command)
    {
        var user = await GetByUsername(command.Username) ?? await GetByEmail(command.Email);
        if (user is null)
        {
            return new UserServiceStatus()
            {
                Message = "Username/email is invalid",
                Status = StatusCode.Error
            };   
        }
        if (user.Password != command.Password.Encrypt())
        {
            return new UserServiceStatus()
            {
                Message = "Password is invalid",
                Status = StatusCode.Error
            }; 
            
        }
        
        return new UserServiceStatus()
        {
            Message = "User signed in",
            Status = StatusCode.Success,
        }; 
        
    }
}

public class AuthenticateUserCommand
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

public class UserServiceStatus
{
    public StatusCode Status { get; init; }
    public string Message { get; set; }
}

public enum StatusCode
{
    Success = 0,
    Error = 1
}