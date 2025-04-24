using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Services
{
    public interface IAssetDeclarationDataService
    {
        Task<AssetDeclaration> UpdateAsync(AssetDeclaration assetDeclaration);
    }
}
