using AssetDeclarationsApi.DTOs.Person;
using AssetDeclarationsApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using AssetDeclarationsApi.Services;
using AssetDeclarationsApi.Mappers;

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
        public async Task<ActionResult<List<GetAllWithRealEstateResponse>>> GetAllGroupedByPersons([FromQuery] decimal minValue = 0)
        {
            var persons = await _dataService.GetPersonsWithRecentRealEstate(minValue);

            var response = persons.Select(p => new GetAllWithRealEstateResponse()
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                FullName = p.FullName,
                Link = p.Link,
                RealEstate = p.AssetDeclarations?.FirstOrDefault()?.RealEstate.Select(re => re.MapToDTO()).ToList() ?? new List<RealEstateDTO>()
            });

            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<GetAllRealEstateResponse>>> GetAllPaginated([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var realEstate = await _dataService.GetAllRealEstateAsync(page, pageSize);

            var response = realEstate.Select(x => new GetAllRealEstateResponse() { RealEstate = x.realEstate.MapToDTO(), PersonId = x.person.Id, PersonFullName = x.person.FullName, PersonLink = x.person.Link });
            return Ok(response);
        }

    }
}
