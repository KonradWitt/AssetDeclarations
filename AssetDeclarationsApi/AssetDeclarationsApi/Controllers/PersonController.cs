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

        private readonly List<Person> _persons = new List<Person>()
        { new Person { Id = 1, Name = "TestPerson" },
          new Person { Id = 2, Name = "Konrad Witt" },
          new Person { Id = 3, Name = "Alice Johnson" },
          new Person { Id = 4, Name = "Bob Smith" },
          new Person { Id = 5, Name = "Catherine Zeta" },
          new Person { Id = 6, Name = "David Brown" },
          new Person { Id = 7, Name = "Eleanor Rigby" },
          new Person { Id = 8, Name = "Frank Underwood" },
          new Person { Id = 9, Name = "Georgia Miles" },
          new Person { Id = 10, Name = "Henry Walker" } };

        

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
            return Ok(await _personDataService.GetByIdAsync(id));

        }


    }
}
