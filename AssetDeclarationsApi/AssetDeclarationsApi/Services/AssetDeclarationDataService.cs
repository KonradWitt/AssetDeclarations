using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Services
{
    public class AssetDeclarationDataService : DatabaseService<AssetDeclaration>, IAssetDeclarationDataService
    {
        public AssetDeclarationDataService(DataContext context) : base(context) { }

        public async Task<AssetDeclaration> UpdateAsync(AssetDeclaration assetDeclaration)
        {
            var cashPositions = await Context.CashPositions.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync();
            Context.CashPositions.RemoveRange(cashPositions);
            Context.SecurityPositions.RemoveRange(await Context.SecurityPositions.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            Context.RealEstate.RemoveRange(await Context.RealEstate.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            Context.Liabilities.RemoveRange(await Context.Liabilities.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            Context.PersonalProperties.RemoveRange(await Context.PersonalProperties.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            Context.Incomes.RemoveRange(await Context.Incomes.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            Context.Receivables.RemoveRange(await Context.Receivables.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            Context.BusinessActivities.RemoveRange(await Context.BusinessActivities.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());

            await Context.SaveChangesAsync();
            DbSet.Update(assetDeclaration);
            await Context.SaveChangesAsync();

            var ad = await DbSet.FindAsync(assetDeclaration.Id);
            return ad;
        }
    }
}
