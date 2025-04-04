using Microsoft.EntityFrameworkCore;
using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Services.DatabaseServices
{
    public interface IPersonDataService : IDatabaseService<Person>
    {
        Task<Person?> GetIncludingDetails(int id);

        Task<IEnumerable<Person>> GetHighlightsPersonsAsync();
    }
}
