using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.DTOs.Person;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Mappers;
using AssetDeclarationsApi.Services;
using Microsoft.AspNetCore.Authorization;
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

        private readonly IDatabaseService _dataService;
        public PersonController(IDatabaseService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetResponse>> Get(int id)
        {
            var person = await _dataService.GetPersonIncludingDetailsAsync(id);

            if (person is null)
            {
                return NotFound();
            }

            var response = new GetResponse()
            {
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

        [HttpGet("{link}")]
        public async Task<ActionResult<GetResponse>> GetByLink(string link)
        {
            var person = await _dataService.GetPersonIncludingDetailsByLinkAsync(link);

            if (person is null)
            {
                return NotFound();
            }

            var response = new GetResponse()
            {
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
        public async Task<ActionResult<List<GetAllResponse>>> GetAll()
        {
            var persons = await _dataService.GetAllAsync<Person>();

            if (persons is null)
            {
                return NotFound();
            }

            var response = persons.Select(p => new GetAllResponse() { FullName = p.FullName, Link = p.Link }).ToList();


            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<GetAllAlphabeticalResponse>>> GetAllAlphabeticalPagineted([FromQuery] int page = 0, [FromQuery] int pageSize = 10)
        {
            var persons = await _dataService.GetAllPersonsAlphabeticallyPaginated(page, pageSize);

            if (persons is null)
            {
                return NotFound();
            }

            var response = persons.Select(p => new GetAllAlphabeticalResponse()
            {
                FullName = p.person.FullName,
                Link = p.person.Link,
                ImageUrl = p.person.ImageUrl,
                Party = p.person.Party.MapToDTO(),
                NetWorth = p.netWorth
            }).ToList();


            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<List<GetHighlightsResponse>>> GetHighlights()
        {
            var persons = await _dataService.GetHighlightsAsync();

            var response = persons.Select(person => new GetHighlightsResponse()
            {
                FullName = person.FullName,
                Link = person.Link,
                ImageUrl = person.ImageUrl,
                NetWorth = person.AssetDeclarations?.FirstOrDefault()?.NetValue ?? 0
            });

            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<int>> GetCount()
        {
            return Ok(await _dataService.GetCountAsync<Person>());
        }



        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<CreateResponse>> Create([FromBody] CreateRequest request)
        {
            if (request == null)
            {
                return BadRequest("Person object is null.");
            }

            var person = new Person()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth ?? default,
                PlaceOfBirth = request.PlaceOfBirth,
                ImageUrl = request.ImageUrl,
                PartyId = request.PartyId,
                AssetDeclarations = request.AssetDeclarations?.Select(ad => ad.MapToEntity()).ToList(),
            };

            if (person is not null && person.AssetDeclarations is not null)
            {
                foreach (var ad in person.AssetDeclarations)
                {
                    ad.CalculateNetValue();
                }
            }
            var createdPerson = await _dataService.AddAsync(person);

            return CreatedAtAction(nameof(Get), new { id = createdPerson.Id }, createdPerson);
        }
    }
}
