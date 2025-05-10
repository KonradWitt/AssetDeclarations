using AssetDeclarationsApi.DTOs.Party;
using AssetDeclarationsApi.DTOs.RealEstate;
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
                AverageNetWorth = x.AverageNetValue,
                MedianNetWorth = x.MedianNetValue
            });
            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<GetAverageRealEstateCountResponse>>> GetAverageRealEstateCount([FromQuery] decimal minValue = 0)
        {
            var queryResult = await _dataService.GetAverageRealEstateCountPerPartyAsync(minValue);

            var response = queryResult.Select(qr => new GetAverageRealEstateCountResponse()
            {
                Party = qr.Party.MapToDTO(),
                AverageRealEstateCount = qr.AverageRealEstateCount
            });

            return Ok(response);
        }
    }
}
