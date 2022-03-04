using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Controllers;
using Backend.Models;
using Backend.Models.Interfaces;
using Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Attributes;

[AttributeUsage(AttributeTargets.Method)]
public class AuthorizeUserAttribute : ActionFilterAttribute
{

    public string[] Roles { get; set; } 
    
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (context.Controller is not ControllerBase)
            return;

        
        if (context.HttpContext.RequestServices.GetService(typeof(IAuthService)) is IAuthService authService &&
            context.HttpContext.RequestServices.GetService(typeof(IUserService)) is IUserService)
        {
            var authToken = context.HttpContext.Request.Headers["Auth-token"];

            if (string.IsNullOrWhiteSpace(authToken))
                await SetStatusUnauthorized(context.Controller as ControllerBase);
            
            var validToken = await authService.CheckValid(authToken);

            var user = await authService.GetAuthenticatedUser(authToken);

            var authorized = CheckIfAuthorized(user, authService);
            
            if (!validToken || !authorized)
            {
                await SetStatusUnauthorized(context.Controller as ControllerBase);
            }
        }
    }

    private bool CheckIfAuthorized(User user, IAuthService authService)
    {
        if (user is null)
            return false;
        
        if (Roles is null || !Roles.Any() || Roles.All(string.IsNullOrWhiteSpace))
            return true;

        return Roles.Any(x => authService.IsInRole(user, x));
    }

    private async Task SetStatusUnauthorized(ControllerBase c)
    {
        c.Response.StatusCode = 401;
        await c.Response.WriteAsJsonAsync(new UserServiceStatus() { Message = "Not authorized to view this content.", Status = StatusCode.Error });
        
    }
}