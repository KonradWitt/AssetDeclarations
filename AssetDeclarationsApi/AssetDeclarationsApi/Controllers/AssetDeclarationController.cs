using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AssetDeclarationsApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AssetDeclarationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IDatabaseService _dataService;
        public AssetDeclarationController(IDatabaseService dataService, IAuthService authService)
        {
            _dataService = dataService;
            _authService = authService;
        }


        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AssetDeclaration assetDeclaration)
        {
            var authenticatedUser = await GetAuthenticatedUserAsync();
            if(authenticatedUser is null)
            {
                return Unauthorized();
            }

            assetDeclaration.Id = id;
            assetDeclaration.CashPositions?.ToList().ForEach(x => x.Id = 0);
            assetDeclaration.SecurityPositions?.ToList().ForEach(x => x.Id = 0);
            assetDeclaration.RealEstate?.ToList().ForEach(x => x.Id = 0);
            assetDeclaration.Liabilities?.ToList().ForEach(x => x.Id = 0);
            assetDeclaration.PersonalProperties?.ToList().ForEach(x => x.Id = 0);
            assetDeclaration.Incomes?.ToList().ForEach(x => x.Id = 0);
            assetDeclaration.Receivables?.ToList().ForEach(x => x.Id = 0);
            assetDeclaration.BusinessActivities?.ToList().ForEach(x => x.Id = 0);

            assetDeclaration.CalculateNetValue();

            await _dataService.UpdateAssetDeclarationAsync(assetDeclaration);
            return Ok();
        }

        private async Task<User?> GetAuthenticatedUserAsync()
        {
            int userId;

            if (int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out userId))
            {
                return await _authService.GetUserAsync(userId);
            }
            else
            {
                return null;
            }

        }
    }
}
