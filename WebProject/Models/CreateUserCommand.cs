using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Backend.Models;

public class CreateUserCommand
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}