using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AssetDeclarationController : ControllerBase
    {
        private readonly IDatabaseService _dataService;
        public AssetDeclarationController(IDatabaseService dataService)
        {
            _dataService = dataService;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AssetDeclaration assetDeclaration)
        {
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

            await _dataService.UpdateAsync(assetDeclaration);
            return Ok();
        }
    }
}
