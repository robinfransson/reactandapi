namespace Backend.Models;

public class AuthenticateUserCommand
{
    public string Username { get; set; }
    public string Password { get; set; }
}