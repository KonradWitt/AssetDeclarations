using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Services.DatabaseServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Runtime.InteropServices;
using System.Security.Cryptography.Xml;

namespace AssetDeclarationsApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PersonController : ControllerBase
    {

        private readonly IPersonDataService _personDataService;

        public PersonController(IPersonDataService personDataService)
        {
            _personDataService = personDataService;
        }

        [HttpGet("{id}")]
        [ActionName("Get")]
        public async Task<ActionResult<Person>> Get(int id)
        {
            return Ok(await _personDataService.GetIncludingDetails(id));
        }

        [HttpGet]
        [ActionName("GetAll")]
        public async Task<ActionResult<List<Person>>> GetAll()
        {
            return Ok(await _personDataService.GetAllAsync());
        }

        [HttpGet]
        [ActionName("GetAllWithRealEstate")]
        public async Task<ActionResult<List<Person>>> GetAllWithRealEstate([FromQuery] decimal minValue = 0)
        {
            var persons = await _personDataService.GetPersonsWithRecentRealEstate(minValue);
            var response = persons.Select(p => new PersonWithRealEstateDTO() { Id = p.Id, Name = p.FullName, RealEstate = p.AssetDeclarations?.FirstOrDefault()?.RealEstate.ToList() ?? new List<RealEstate>() });
            return Ok(response);
        }

        [HttpGet]
        [ActionName("GetHighlights")]
        public async Task<ActionResult<List<Person>>> GetHighlights()
        {
            return Ok(await _personDataService.GetHighlightsAsync());
        }



        [HttpPost]
        [ActionName("Create")]
        public async Task<ActionResult<Person>> Create([FromBody] Person person)
        {
            if (person == null)
            {
                return BadRequest("Person object is null.");
            }

            if (person.AssetDeclarations is not null)
            {
                foreach (var ad in person.AssetDeclarations)
                {
                    ad.CalculateNetValue();
                }
            }

            var createdPerson = await _personDataService.AddAsync(person);

            return CreatedAtAction(nameof(Get), new { id = createdPerson.Id }, createdPerson);
        }
    }
}
