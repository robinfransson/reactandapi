using System.Threading.Tasks;
using Backend.Models;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers;

public class UserController : BaseApiController<UserService>
{
    private readonly IUserService _userService;

    public UserController(IUserService userService, ILogger<UserService> logger) : base(logger)
    {
        _userService = userService;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> Create(CreateUserCommand userCommand)
    {
        var result = await _userService.Create(userCommand);

        if (result.Status == Models.StatusCode.Error)
            return BadRequest(new {Message = result.Message});
        return Ok(result.Message);
    }
}