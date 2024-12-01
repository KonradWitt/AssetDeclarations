using Microsoft.EntityFrameworkCore;
using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Services.DatabaseServices
{
    public interface IPersonDataService : IDatabaseService<Person>
    {
        Task<Person> GetPersonByNameAsync(string name);
    }
}
