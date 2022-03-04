using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace Database;

public sealed class LocalDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<AuthToken> AuthTokens { get; set; }

    private string DbPath { get; }

    public LocalDbContext()
    {
        DbPath = Path.Join(@"D:\source\reactandapi\Database", "test.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}");
        
    }
        

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}