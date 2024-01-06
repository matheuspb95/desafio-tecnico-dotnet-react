using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        #region Required
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var hasher = new PasswordHasher<User>();
            modelBuilder.Entity<User>().HasData(new List<User>
            {
                new User {
                    Id = 1, 
                    Name = "Admin", 
                    SurName = "Admin", 
                    Email = "admin@admin.com", 
                    Password = hasher.HashPassword(null, "Senha.123"),
                    AccesType = Models.AccesTypes.Admin
                }
            });
        }
        #endregion
    }
}