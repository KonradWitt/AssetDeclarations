using AssetDeclarationsApi.DTOs.Auth;
using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Services
{
    public interface IAuthService
    {
        Task<User?> GetUserAsync(int id);
        Task<User?> GetAuthenticatedUserAsync();
        Task<RegisterResponse?> RegisterAsync(RegisterRequest request);
        Task<LoginResponse?> LoginAsync(LoginRequest user);
    }
}
