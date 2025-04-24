using AssetDeclarationsApi.DTOs.Auth;
using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Services
{
    public interface IAuthService : IDatabaseService<User>
    {
        Task<RegisterResponse?> RegisterAsync(RegisterRequest request);    
        Task <LoginResponse?> LoginAsync(LoginRequest user);
    }
}
