using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Services.DatabaseServices
{
    public interface IAssetDeclarationDataService
    {
        Task<AssetDeclaration> UpdateAsync(AssetDeclaration assetDeclaration);
    }
}
