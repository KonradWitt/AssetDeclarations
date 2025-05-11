using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AssetDeclarationsApi.Services
{
    public interface IDatabaseService
    {
        Task<IEnumerable<T>> GetAllAsync<T>() where T : class;
        Task<T> GetByIdAsync<T>(int id) where T : class;
        Task<int> GetCountAsync<T>() where T : class;
        Task<T> AddAsync<T>(T entity) where T : class;
        Task UpdateAsync<T>(T entity) where T : class;
        Task DeleteAsync<T>(int id) where T : class;

        Task<List<Person>> GetAllPersonsSortedByLastNamePaginated(int page, int pageSize);
        Task<Person?> GetPersonIncludingDetailsAsync(int id);
        Task<Person?> GetPersonIncludingDetailsByLinkAsync(string link);
        Task<IEnumerable<Person>> GetHighlightsAsync();
        Task<List<(Person Person, int RealEstateCount)>> GetAllPersonsWithRealEstateCountAsync(decimal minValue);
        Task<List<(Person Person, RealEstate RealEstate)>> GetAllRealEstateAsync(int page, int pageSize);
        Task<int> GetNumberOfRealEstatesAsync();
        Task<AssetDeclaration> UpdateAssetDeclarationAsync(AssetDeclaration assetDeclaration);
        Task<User?> GetUserByUserNameAsync(string userName);

        Task<List<(Party Party, decimal AverageNetValue, decimal MedianNetValue)>> GetAverageNetWorthPerPartyAsync();
        Task<List<(Party Party, double AverageRealEstateCount)>> GetAverageRealEstateCountPerPartyAsync(decimal minValue);


    }
}
