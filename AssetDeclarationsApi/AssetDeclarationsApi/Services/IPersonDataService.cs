using Microsoft.EntityFrameworkCore;
using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Services
{
    public interface IPersonDataService : IDatabaseService<Person>
    {
        Task<Person?> GetIncludingDetails(int id);

        Task<IEnumerable<Person>> GetHighlightsAsync();

        Task<IEnumerable<Person>> GetPersonsWithRecentRealEstate(decimal minValue);

        Task<IEnumerable<RealEstate>> GetAllRealEstateAsync();

    }
}
