using System.Threading.Tasks;
using Backend.Helpers;
using Backend.Models;
using Backend.Models.Interfaces;
using Backend.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers;

[ApiController]
public class UserController : BaseApiController<UserService>
{
    private readonly IUserService _userService;

    public UserController(IUserService userService, ILogger<UserService> logger) : base(logger)
    {
        _userService = userService;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> CreateAsync(CreateUserCommand userCommand)
    {
    var result = await _userService.Create(userCommand);

        if (result.Status == Models.StatusCode.Error)
            return BadRequest(result);
        return Ok(result);
    }
    
    [HttpPost]
    [Route("Signin")]
    public async Task<IActionResult> SigninAsync(AuthenticateUserCommand authenticateUserCommand)
    {
        var result = await _userService.SignIn(authenticateUserCommand);
        
        if(result.Status == Models.StatusCode.Error)
            return BadRequest(result);
        
        return Ok(result);
    }
}