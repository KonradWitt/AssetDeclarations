using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.DTOs.Person;
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
        public async Task<ActionResult<Person>> Get(int id)
        {
            return Ok(await _personDataService.GetIncludingDetails(id));
        }

        [HttpGet]
        public async Task<ActionResult<List<Person>>> GetAll()
        {
            return Ok(await _personDataService.GetAllAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<Person>>> GetAllWithRealEstate([FromQuery] decimal minValue = 0)
        {
            var persons = await _personDataService.GetPersonsWithRecentRealEstate(minValue);

            var response = persons.Select(p => new GetAllWithRealEstateResponse()
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                FullName = p.FullName,
                Link = p.Link,
                RealEstate = p.AssetDeclarations?.SingleOrDefault()?.RealEstate.ToList() ?? new List<RealEstate>()
            });

            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<GetHighlightsResponse>>> GetHighlights()
        {
            var persons = await _personDataService.GetHighlightsAsync();

            var response = persons.Select(person => new GetHighlightsResponse()
            {
                Id = person.Id,
                FullName = person.FullName,
                Link = person.Link,
                ImageUrl = person.ImageUrl,
                NetWorth = person.AssetDeclarations?.FirstOrDefault()?.NetValue ?? 0
            });

            return Ok(response);
        }



        [HttpPost]
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
