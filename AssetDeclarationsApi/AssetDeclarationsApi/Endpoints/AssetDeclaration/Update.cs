using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.AssetDeclaration
{
    public class Update : EndpointBase<AssetDeclarationDTO, Results<Ok, BadRequest>>
    {
        private readonly DataContext _dataContext;

        public Update(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Put($"{Route}");
            Policies("ADMIN");
        }

        public override async Task<Results<Ok, BadRequest>> ExecuteAsync(AssetDeclarationDTO req, CancellationToken ct)
        {
            if (req is null)
            {
                return TypedResults.BadRequest();
            }

            var assetDeclaration = req.MapToEntity();

            assetDeclaration.CashPositions?.ForEach(x => x.Id = 0);
            assetDeclaration.SecurityPositions?.ForEach(x => x.Id = 0);
            assetDeclaration.RealEstate?.ForEach(x => x.Id = 0);
            assetDeclaration.Liabilities?.ForEach(x => x.Id = 0);
            assetDeclaration.PersonalProperties?.ForEach(x => x.Id = 0);
            assetDeclaration.Incomes?.ForEach(x => x.Id = 0);
            assetDeclaration.Receivables?.ForEach(x => x.Id = 0);
            assetDeclaration.BusinessActivities?.ForEach(x => x.Id = 0);

            assetDeclaration.CalculateNetValue();

            _dataContext.CashPositions.RemoveRange(await _dataContext.CashPositions.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _dataContext.SecurityPositions.RemoveRange(await _dataContext.SecurityPositions.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _dataContext.RealEstate.RemoveRange(await _dataContext.RealEstate.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _dataContext.Liabilities.RemoveRange(await _dataContext.Liabilities.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _dataContext.PersonalProperties.RemoveRange(await _dataContext.PersonalProperties.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _dataContext.Incomes.RemoveRange(await _dataContext.Incomes.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _dataContext.Receivables.RemoveRange(await _dataContext.Receivables.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _dataContext.BusinessActivities.RemoveRange(await _dataContext.BusinessActivities.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());

            await _dataContext.SaveChangesAsync();
            _dataContext.AssetDeclarations.Update(assetDeclaration);
            await _dataContext.SaveChangesAsync();

            return TypedResults.Ok();
        }
    }
}
