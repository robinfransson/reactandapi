using System.Linq;
using System.Threading.Tasks;
using Backend.Attributes;
using Backend.Helpers;
using Backend.Models;
using Backend.Models.Interfaces;
using Backend.Services;
using Backend.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers;

[ApiController]
public class UserController : BaseApiController<UserService>
{
    private readonly IUserService _userService;
    private readonly IAuthService _authService;

    public UserController(IUserService userService, IAuthService authService, ILogger<UserService> logger) : base(logger)
    {
        _userService = userService;
        _authService = authService;
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
    
    
    
    [HttpGet, Route("AddRole"), AuthorizeUser(Roles = new []{ "Admin" })]
    public IActionResult AddRole()
    {
        Logger.LogInformation("Added role");
        return Ok(new UserServiceStatus()
        {
            Message = "You are authorized",
            Status = Models.StatusCode.Success
        });
    }
    

    [HttpGet, Route("Verify"), AuthorizeUser]
    public IActionResult VerifyToken()
    {
        //invalid token is caught in the AuthorizeUser attribute
        return Ok();
    }
    
    [HttpPost]
    [Route("Signin")]
    public async Task<IActionResult> SigninAsync(AuthenticateUserCommand authenticateUserCommand)
    {
        var result = await _userService.SignIn(authenticateUserCommand);
        
        if(result.Status == Models.StatusCode.Error)
            return BadRequest(result);

        var token = await _authService.GenerateAuthToken(authenticateUserCommand.Username);

        if (token is null)
            return BadRequest(new UserServiceStatus
            {
                Message = "Internal server error.",
                Status = Models.StatusCode.Error
            });
        Response.Headers.Add("Auth-token",token.Token);
        Response.Headers.Add("Access-Control-Expose-Headers", "Auth-token");
        return Ok(result);
    }
}