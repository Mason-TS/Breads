using final_api.Models;
using Microsoft.EntityFrameworkCore;

namespace final_api.Migrations;

public class SocialDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Post> Post { get; set; }
    
    public SocialDbContext(DbContextOptions<SocialDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.PostId);
            entity.Property(e => e.Body).IsRequired();
            entity.Property(e => e.PostDate).IsRequired();
            entity.Property(e => e.Username).IsRequired();
                
            
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId);
            entity.Property(x => x.Username).IsRequired();
            entity.HasIndex(e => e.Username).IsUnique();
            entity.Property(e => e.Password).IsRequired();
            entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.City);
            entity.Property(e => e.State);
            entity.Property(e => e.Bio);
            entity.Property(e => e.Gender);
        });

    }
}