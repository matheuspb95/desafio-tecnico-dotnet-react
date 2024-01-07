using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public enum AccesTypes {
        Admin = 0,
        Normal = 1
    }
    [Table("users")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; }
        [Column("sur_name")]
        public string SurName { get; set; }

        [Column("email")]
        public string Email { get; set; }
        [Column("password")]
        public string Password { get; set; }

        [Column("access_type")]
        public AccesTypes AccesType { get; set; } = AccesTypes.Normal;
    }
}