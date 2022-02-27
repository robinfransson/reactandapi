namespace Database;

public class AuthToken
{
    public int Id { get; set; }
    public Guid UserGuid { get; set; }
    public DateTime ValidTo { get; set; }
    public string Token { get; set; }
}