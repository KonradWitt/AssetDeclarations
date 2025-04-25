using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AssetDeclarationsApi.Services
{
    public interface IDatabaseService
    {
        Task<IEnumerable<T>> GetAllAsync<T>() where T : class;
        Task<T> GetByIdAsync<T>(int id) where T : class;
        Task<T> AddAsync<T>(T entity) where T : class;
        Task UpdateAsync<T>(T entity) where T : class;
        Task DeleteAsync<T>(int id) where T : class;
        Task<Person?> GetPersonIncludingDetails(int id);
        Task<IEnumerable<Person>> GetHighlightsAsync();
        Task<IEnumerable<Person>> GetPersonsWithRecentRealEstate(decimal minValue);
        Task<List<(Person person, RealEstate realEstate)>> GetAllRealEstateAsync(int page, int pageSize);
        Task<AssetDeclaration> UpdateAssetDeclarationAsync(AssetDeclaration assetDeclaration);
        Task<User?> GetUserByUserNameAsync(string userName);

    }
}
