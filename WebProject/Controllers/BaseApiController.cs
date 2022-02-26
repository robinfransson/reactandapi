using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseApiController<T> :  ControllerBase where T : class  
{
    private readonly ILogger<T> _logger;

    protected BaseApiController(ILogger<T> logger)
    {
        _logger = logger;
    }
}