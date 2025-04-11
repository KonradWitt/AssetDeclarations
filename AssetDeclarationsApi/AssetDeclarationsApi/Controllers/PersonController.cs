using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Services.DatabaseServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Runtime.InteropServices;

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

            var createdPerson = await _personDataService.AddAsync(person);

            return CreatedAtAction(nameof(Get), new { id = createdPerson.Id }, createdPerson);
        }
    }
}
