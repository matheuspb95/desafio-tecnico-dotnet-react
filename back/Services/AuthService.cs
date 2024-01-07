using Data;
using Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services
{
    public class AuthService
    {
        private readonly UserContext dataContext;
        private readonly IConfiguration configuration;

        public AuthService(UserContext dataContext, IConfiguration configuration)
        {
            this.dataContext = dataContext;
            this.configuration = configuration;
        }

        public string GenerateJwtToken(string email, Models.AccesTypes access_type)
        {
            var issuer = this.configuration["Jwt:Issuer"];
            var audience = this.configuration["Jwt:Audience"];
            var key = Encoding.ASCII.GetBytes(this.configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new []
                        {
                            new Claim("Id", Guid.NewGuid().ToString()),
                                new Claim(JwtRegisteredClaimNames.Sub, email),
                                new Claim(JwtRegisteredClaimNames.Email, email),
                                new Claim(ClaimTypes.Role, access_type == Models.AccesTypes.Admin ? "Admin" : "Normal"),
                                new Claim(JwtRegisteredClaimNames.Jti,
                                    Guid.NewGuid().ToString())
                        }),
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
        

        public bool IsAuthenticated(string email, string password)
        {
            if (this.DoesUserExists(email)){
                var user = this.GetByEmail(email);
                var passwordHasher = new PasswordHasher<User>();
                var result = passwordHasher.VerifyHashedPassword(user, user.Password, password);

                return result == PasswordVerificationResult.Success;
            } else {
                return false;
            }
        }

        public bool DoesUserExists(string email)
        {
            var user = this.dataContext.Users.FirstOrDefault(x => x.Email == email);
            return user != null;
        }

        public User GetByEmail(string email)
        {
            return this.dataContext.Users.FirstOrDefault(c => c.Email == email);
        }

        public string DecodeEmailFromToken(string token)
        {
            var decodedToken = new JwtSecurityTokenHandler();
            var indexOfTokenValue = 7;

            var t = decodedToken.ReadJwtToken(token.Substring(indexOfTokenValue));

            return t.Payload.FirstOrDefault(x => x.Key == "email").Value.ToString();
        }
    }
}
