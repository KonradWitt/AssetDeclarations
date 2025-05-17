using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs.Auth;
using AssetDeclarationsApi.Entities;
using Azure.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AssetDeclarationsApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;
        private readonly IDatabaseService _dataService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthService(IConfiguration config, IDatabaseService dataService, IHttpContextAccessor httpContextAccessor)
        {
            _config = config;
            _dataService = dataService;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<User?> GetUserAsync(int id)
        {
            return _dataService.GetByIdAsync<User>(id);
        }

        public async Task<User?> GetAuthenticatedUserAsync()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var idClaim = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (int.TryParse(idClaim, out var userId))
            {
                return await GetUserAsync(userId);
            }
            else
            {
                return null;
            }

        }

        public async Task<RegisterResponse?> RegisterAsync(RegisterRequest request)
        {
            var existingUser = await _dataService.GetUserByUserNameAsync(request.UserName);
            if (existingUser is not null)
            {
                return null;
            }

            var user = new User { UserName = request.UserName };
            user.PasswordHash = new PasswordHasher<User>().HashPassword(user, request.Password);
            var addedUser = await _dataService.AddAsync(user);


            var response = new RegisterResponse { UserName = addedUser.UserName };
            return response;
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {
            var user = await _dataService.GetUserByUserNameAsync(request.UserName);

            if (user is null || !user.IsActive)
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

        private string CreateToken(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, user.IsAdmin ? "ADMIN": "USER" )
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("AppSettings:SecurityKey")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _config.GetValue<string>("AppSettings:Issuer"),
                audience: _config.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }


    }
}
