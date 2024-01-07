namespace Models
{
    using System.ComponentModel.DataAnnotations;

    public class LoginModel
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}