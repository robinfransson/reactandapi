using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseApiController<T> :  ControllerBase where T : class  
{
    protected readonly ILogger<T> Logger;

    protected BaseApiController(ILogger<T> logger)
    {
        Logger = logger;
    }
}