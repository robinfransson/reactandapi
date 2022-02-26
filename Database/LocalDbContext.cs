using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace Database;

public class LocalDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<UserAuthentication> UserAuthentications { get; set; }

    private string DbPath { get; }

    public LocalDbContext()
    {
        var path = Directory.GetCurrentDirectory();
        DbPath = Path.Join(path, "test.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}