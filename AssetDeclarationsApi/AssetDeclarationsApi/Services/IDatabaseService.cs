using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AssetDeclarationsApi.Services
{
    public interface IDatabaseService
    {
        Task<T> GetByIdAsync<T>(int id) where T : class;
        Task<T> AddAsync<T>(T entity) where T : class;

        Task<List<(Person Person, int RealEstateCount)>> GetAllPersonsWithRealEstateCountAsync(decimal minValue);
        Task<List<(Person Person, RealEstate RealEstate)>> GetAllRealEstateAsync(int page, int pageSize);
        Task<int> GetNumberOfRealEstatesAsync();
        Task<AssetDeclaration> UpdateAssetDeclarationAsync(AssetDeclaration assetDeclaration);
        Task<User?> GetUserByUserNameAsync(string userName);
    }
}
