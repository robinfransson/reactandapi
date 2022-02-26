using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Backend.Models;
using Database;
using static WebProject.Config.StaticObjects;

namespace Backend.Controllers;

public class HomeController : BaseApiController<HomeController>
{
    private readonly ILogger<HomeController> _logger;
    private readonly LocalDbContext _context;

    public HomeController(ILogger<HomeController> logger, LocalDbContext context) : base(logger)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(DefaultHome);
    }

    [HttpGet]
    [Route("Products")]
    public async Task<IActionResult> GetProducts()
    {
        return Ok(DefaultHome.Products);
    }
}