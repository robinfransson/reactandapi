using System;
using System.Threading.Tasks;
using Backend.Helpers;
using Backend.Models.Interfaces;
using Database;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class AuthService : IAuthService
{
    private readonly IUserService _userService;
    private readonly LocalDbContext _context;

    
    public AuthService(IUserService userService, LocalDbContext context)
    {
        _userService = userService;
        _context = context;
    }
    
    
    public async Task<AuthToken> GenerateAuthToken(string username)
    {
        var user = await _userService.GetByUsername(username) ?? await _userService.GetByEmail(username);

        if (user is null)
            return null;
        
        var validTo = DateTime.Now.AddHours(1);
        var rand = new Random();

        var secretNumber = rand.Next(int.MinValue, int.MaxValue);

        var token = $"{user.Id},{validTo},{secretNumber}".Encrypt();

        var tokenObject = new AuthToken()
        {
            UserGuid = user.Id,
            Token = token,
            ValidTo = validTo,
            
        };

        await _context.AuthTokens.AddAsync(tokenObject);
        await _context.SaveChangesAsync();

        return tokenObject;

    }

    public async Task<bool> CheckValid(string authToken)
    {
        var token = await _context.AuthTokens.FirstOrDefaultAsync(x => x.Token == authToken);
        var tokenIsValid = token is not null && token.ValidTo > DateTime.Now;
        return tokenIsValid;
    }

    public async Task InvalidateToken(string token)
    {
        var storedToken = await _context.AuthTokens.FirstOrDefaultAsync(x => x.Token == token);

        if (token is null)
            return;
        
        storedToken.ValidTo = DateTime.Now;
        await _context.SaveChangesAsync();

    }
}