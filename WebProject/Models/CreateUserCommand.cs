using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class CreateUserCommand
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Email { get; set; }
}