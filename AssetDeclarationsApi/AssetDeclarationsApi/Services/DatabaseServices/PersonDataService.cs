using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Services.DatabaseServices
{
    public class PersonDataService : DatabaseService<Person>, IPersonDataService
    {
        public PersonDataService(DataContext context) : base(context) { }

        public Task<Person> GetPersonByNameAsync(string name)
        {
            throw new NotImplementedException();
        }
    }
}
