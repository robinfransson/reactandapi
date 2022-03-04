using System;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models.Interfaces;
using Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Models;

public class RoleManager : IRoleManager
{
    private readonly LocalDbContext _context;
    private readonly ILogger<RoleManager> _logger;

    public RoleManager(LocalDbContext context, ILogger<RoleManager> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public async Task AddRole(string roleName)
    {
        var role = new Role()
        {
            Name = roleName
        };
        await _context.Roles.AddAsync(role);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveRole(string roleName)
    {
        var role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == roleName);

        if (role is null)
        {
            _logger.LogInformation($"The role {roleName} does not exist.");
            return;
        }
        
        
        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();
        
    }

    public async Task AddUserToRole(User user, string roleName)
    {
        var role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == roleName);
        if(role is null)
            _logger.LogError($"The role {roleName} does not exist!");
        
        role?.Users.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveUserFromRole(User user, string roleName)
    {
        var role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == roleName);
        if(role is null)
            _logger.LogError($"The role {roleName} does not exist!");
        
        role?.Users.Remove(user);
    }
}