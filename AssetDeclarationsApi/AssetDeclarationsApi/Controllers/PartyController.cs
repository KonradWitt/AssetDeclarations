using AssetDeclarationsApi.DTOs.Party;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Mappers;
using AssetDeclarationsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace AssetDeclarationsApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PartyController : ControllerBase
    {
        private readonly IDatabaseService _dataService;
        public PartyController(IDatabaseService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetAverageNetWorthResponse>>> GetAverageNetWorth()
        {
            var result = await _dataService.GetAverageNetWorthPerPartyAsync();
            var response = result.Select(x => new GetAverageNetWorthResponse()
            {
                Party = x.Party.MapToDTO(),
                AverageNetWorth = x.AverageNetValue
            });
            return Ok(response);
        }
    }
}
