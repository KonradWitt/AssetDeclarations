using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.DTOs.Person;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Mappers;
using AssetDeclarationsApi.Services;
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
        public async Task<ActionResult<GetResponse>> Get(int id)
        {
            var person = await _personDataService.GetIncludingDetails(id);

            if (person is null)
            {
                return NotFound();
            }

            var response = new GetResponse()
            {
                Id = person.Id,
                LastName = person.LastName,
                FullName = person.FullName,
                Link = person.Link,
                DateOfBirth = person.DateOfBirth,
                PlaceOfBirth = person.PlaceOfBirth,
                ImageUrl = person.ImageUrl,
                Party = person.Party?.MapToDTO(),
                AssetDeclarations = person.AssetDeclarations?.Select(ad => ad.MapToDTO()).ToList(),

            };
            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<GetAllResponse>> GetAll()
        {
            var persons = await _personDataService.GetAllAsync();

            if (persons is null)
            {
                return NotFound();
            }

            var response = new GetAllResponse()
            {
                Persons = persons.Select(p => new GetAllReponsePersonDTO() { Id = p.Id, FullName = p.FullName, Link = p.Link }).ToList()
            };

            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<GetAllWithRealEstateResponse>>> GetAllWithRealEstate([FromQuery] decimal minValue = 0)
        {
            var persons = await _personDataService.GetPersonsWithRecentRealEstate(minValue);

            var response = persons.Select(p => new GetAllWithRealEstateResponse()
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                FullName = p.FullName,
                Link = p.Link,
                RealEstate = p.AssetDeclarations?.FirstOrDefault()?.RealEstate.ToList() ?? new List<RealEstate>()
            });

            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<RealEstateDTO>>> GetAllRealEstate([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var realEstate = await _personDataService.GetAllRealEstateAsync();

            return Ok(realEstate);
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
        public async Task<ActionResult<CreateResponse>> Create([FromBody] CreateRequest request)
        {
            if (request == null)
            {
                return BadRequest("Person object is null.");
            }

            var person = new Person()

            {
                Id = request.Id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth ?? default,
                PlaceOfBirth = request.PlaceOfBirth,
                ImageUrl = request.ImageUrl,
                PartyId = request.PartyId,
                AssetDeclarations = request.AssetDeclarations.Select(ad => ad.MapToEntity()).ToList(),
            };

            var createdPerson = await _personDataService.AddAsync(person);

            return CreatedAtAction(nameof(Get), new { id = createdPerson.Id }, createdPerson);
        }
    }
}
