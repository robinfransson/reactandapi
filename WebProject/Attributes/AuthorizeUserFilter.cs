using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Backend.Controllers;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Attributes;

[AttributeUsage(AttributeTargets.Method)]
public class AuthorizeUserAttribute : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!ValidContext(context))
        {
            if (context.Controller is ControllerBase c)
            {
                SetStatusUnauthorized(c);
            }
            return;
        }
        
        if (context.Controller is ControllerBase controller &&
            context.HttpContext.RequestServices.GetService(typeof(IAuthService)) is IAuthService authService)
        {
            
            var authToken = controller.Request.Headers["Auth-token"];
            var validToken = await authService.CheckValid(authToken);
            if (!validToken)
            {
                SetStatusUnauthorized(controller);
                return;
            }
        }
        

    }

    private static bool ValidContext(ActionExecutingContext context)
    {
        if (context.Controller is not ControllerBase controller)
            return false;

        var authToken = controller.Request.Headers["Auth-token"];
        
        return authToken.Any();
        
    }

    private static void SetStatusUnauthorized(ControllerBase c)
    {
        c.Response.StatusCode = 401;
    }
}