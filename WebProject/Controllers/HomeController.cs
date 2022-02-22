using Backend.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebProject.Models;
using static WebProject.Config.StaticObjects;

namespace Backend.Controllers
{
    public class HomeController : BaseApiController
    {
    private readonly ILogger<HomeController> _logger;
        
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
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
}
