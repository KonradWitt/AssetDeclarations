using AssetDeclarationsApi.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AssetDeclarationsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Person>>> GetAllPersons()
        {
            var persons = new List<Person> { new Person { Id = 1, Name = "TestPerson" }, new Person { Id = 2, Name = "Konrad Witt" } };
            return Ok(persons);
        }


    }
}
