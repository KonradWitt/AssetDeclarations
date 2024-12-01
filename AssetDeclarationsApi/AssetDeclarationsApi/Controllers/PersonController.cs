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

        [HttpGet]
        [ActionName("GetAll")]
        public async Task<ActionResult<List<Person>>> GetAllPersons()
        {
            return Ok(await _personDataService.GetAllAsync());
        }

        [HttpGet("{id}")]
        [ActionName("GetById")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            return Ok(await _personDataService.GetIncludingDetails(id));
        }


    }
}
