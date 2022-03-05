using System.Net.Http;
using Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseApiController<T> :  ControllerBase where T : class  
{
    protected readonly ILogger<T> Logger;
    private readonly HttpContext _context; 
    protected User CurrentUser => _context.Items["User"] as User;

    protected BaseApiController(ILogger<T> logger, IHttpContextAccessor httpContextAccessor)
    {
        _context = httpContextAccessor.HttpContext;
        Logger = logger;
    }
    
    
    
}