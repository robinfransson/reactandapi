namespace Database;

public class UserAuthentication
{
    public int Id { get; set; }
    public Guid UserGuid { get; set; }
    public DateTime ValidTo { get; set; }
}