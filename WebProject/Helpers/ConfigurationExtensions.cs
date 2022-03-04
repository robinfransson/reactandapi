// using System;
// using System.Collections.Generic;
// using Backend.Models.Interfaces;
// using Backend.Services;
// using Database;
// using Microsoft.Extensions.DependencyInjection;
//
// namespace Backend.Helpers;
//
// public static class ConfigurationExtensions
// {
//     public static IServiceCollection AddMyAuthentication<T>(this IServiceCollection services,
//         Func<RoleConfigurer, RoleConfiguration> roleConfiguration) where T : class, IAuthService
//     {
//         var config = roleConfiguration();
//         foreach (var VARIABLE in config.GetRoles())
//         {
//         }
//
//         services.AddSingleton();
//         services.AddScoped<IAuthService, T>();
//         return services;
//     }
// }
//
// public class RoleConfigurer
// {
// }
//
// public class RoleConfiguration : IRoleConfiguration
// {
//     private List<Role> Roles = new();
//
//
//     public List<Role> GetRoles()
//     {
//         return null;
//     }
//
//     public List<Role> UsersInRole(string role)
//     {
//         throw new NotImplementedException();
//     }
// }
//
// public interface IRoleConfiguration
// {
//     List<Role> GetRoles();
//     List<Role> UsersInRole(string role);
// }
//
// public interface IRole
// {
//     void Add(string name);
//     bool Remove(string name);
// }