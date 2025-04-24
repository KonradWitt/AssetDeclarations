using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs.Auth;
using AssetDeclarationsApi.Entities;
using Azure.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AssetDeclarationsApi.Services
{
    public class AuthService : DatabaseService<User>, IAuthService
    {
        private readonly IConfiguration _config;
        public AuthService(IConfiguration config, DataContext context) : base(context)
        {
            _config = config;
        }

        public async Task<RegisterResponse?> RegisterAsync(RegisterRequest request)
        {
            var existingUser = await GetByUserNameAsync(request.UserName);
            if (existingUser is not null)
            {
                return null;
            }

            var user = new User { UserName = request.UserName };
            user.PasswordHash = new PasswordHasher<User>().HashPassword(user, request.Password);
            var addedUser = await AddAsync(user);


            var response = new RegisterResponse { UserName = addedUser.UserName };
            return response;
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {
            var user = await GetByUserNameAsync(request.UserName);

            if (user is null)
            {
                return null;
            }

            var verification = new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password);

            if (verification == PasswordVerificationResult.Failed)
            {
                return null;
            }

            string token = CreateToken(user);

            var response = new LoginResponse()
            {
                UserName = user.UserName,
                Token = token,
            };

            return response;
        }

        private async Task<User?> GetByUserNameAsync(string userName)
        {
            return await DbSet.FirstOrDefaultAsync(user => user.UserName.ToLower().Trim() == userName.ToLower().Trim());
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("AppSettings:Token")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _config.GetValue<string>("AppSettings:Issuer"),
                audience: _config.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
