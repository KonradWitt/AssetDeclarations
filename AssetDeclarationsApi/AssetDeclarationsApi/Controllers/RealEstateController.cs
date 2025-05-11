using AssetDeclarationsApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using AssetDeclarationsApi.Services;
using AssetDeclarationsApi.Mappers;
using AssetDeclarationsApi.DTOs.RealEstate;

namespace AssetDeclarationsApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RealEstateController : ControllerBase
    {
        private readonly IDatabaseService _dataService;

        public RealEstateController(IDatabaseService databaseService)
        {
            _dataService = databaseService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetAllGroupedByPersonsResponse>>> GetCountPerPerson([FromQuery] decimal minValue = 0)
        {
            var queryResult = await _dataService.GetAllPersonsWithRealEstateCountAsync(minValue);

            var response = queryResult.Select(qr => new GetAllGroupedByPersonsResponse()
            {
                Person = qr.Person.MapToDTO(),
                RealEstateCount = qr.RealEstateCount
            });

            return Ok(response);
        }


        [HttpGet]
        public async Task<ActionResult<List<GetAllResponse>>> GetAllPaginated([FromQuery] int page = 0, [FromQuery] int pageSize = 10)
        {
            var realEstate = await _dataService.GetAllRealEstateAsync(page, pageSize);

            var response = realEstate.Select(x => new GetAllResponse() { Person = x.Person.MapToDTO(), RealEstate = x.RealEstate.MapToDTO() });
            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<int>> GetCount()
        {
            var count = await _dataService.GetNumberOfRealEstatesAsync();

            return Ok(count);
        }

    }
}
