using AssetDeclarationsApi.DTOs.Auth;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace AssetDeclarationsApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _config;
        public AuthController(IConfiguration config, IAuthService authService)
        {
            _authService = authService;
            _config = config;
        }


        [HttpPost()]
        public async Task<ActionResult<RegisterResponse>> Register(RegisterRequest request)
        {
            var response = await _authService.RegisterAsync(request);

            if (response is null)
            {
                return BadRequest("User already exists");
            }

            return Ok(response);
        }

        [HttpPost()]
        public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
        {

            var response = await _authService.LoginAsync(request);
            if (response is null)
            {
                return Unauthorized("Invalid username or password");
            }

            return Ok(response);
        }


        [Authorize]
        [HttpGet()]
        public IActionResult TestAuthentication()
        {
            return Ok("Auth works");
        }
    }
}
