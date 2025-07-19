using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.AssetDeclaration
{
    public record UpdateRequest
    {
        public int Id { get; set; }

        public List<CashPositionDTO>? CashPositions { get; set; }
        public List<SecurityPositionDTO>? SecurityPositions { get; set; }
        public List<RealEstateDTO>? RealEstate { get; set; }
        public List<LiabilityDTO>? Liabilities { get; set; }
        public List<PersonalPropertyDTO>? PersonalProperties { get; set; }
        public List<IncomeDTO>? Incomes { get; set; }
        public List<ReceivableDTO>? Receivables { get; set; }
        public List<BusinessActivityDTO>? BusinessActivities { get; set; }
    }


    public class Update : EndpointBase<UpdateRequest, Results<Ok, BadRequest, NotFound>>
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

        public override async Task<Results<Ok, BadRequest, NotFound>> ExecuteAsync(UpdateRequest req, CancellationToken ct)
        {
            if (req is null)
            {
                return TypedResults.BadRequest();
            }

            Entities.AssetDeclaration assetDeclaration = null!;

            if (req.CashPositions != null ||
                req.SecurityPositions != null ||
                req.RealEstate != null ||
                req.Liabilities != null ||
                req.PersonalProperties != null ||
                req.Incomes != null ||
                req.Receivables != null ||
                req.BusinessActivities != null)
            {
                assetDeclaration = await _dataContext.AssetDeclarations
                    .Include(x => x.CashPositions)
                    .Include(x => x.SecurityPositions)
                    .Include(x => x.RealEstate)
                    .Include(x => x.Liabilities)
                    .Include(x => x.PersonalProperties)
                    .Include(x => x.Incomes)
                    .Include(x => x.Receivables)
                    .Include(x => x.BusinessActivities)
                    .SingleAsync(ad => ad.Id == req.Id);
            }

            if(assetDeclaration is null)
            {
                return TypedResults.NotFound();
            }

            if (req.CashPositions != null)
            {
                var existing = await _dataContext.CashPositions
                    .Where(x => x.AssetDeclarationId == req.Id)
                    .ToListAsync();
                _dataContext.CashPositions.RemoveRange(existing);

                assetDeclaration.CashPositions = req.CashPositions
                    .Select(x =>
                    {
                        var entity = x.MapToEntity();
                        entity.AssetDeclarationId = assetDeclaration.Id;
                        return entity;
                    }).ToList();
            }

            if (req.SecurityPositions != null)
            {
                var existing = await _dataContext.SecurityPositions
                    .Where(x => x.AssetDeclarationId == req.Id)
                    .ToListAsync();
                _dataContext.SecurityPositions.RemoveRange(existing);

                assetDeclaration.SecurityPositions = req.SecurityPositions
                    .Select(x =>
                    {
                        var entity = x.MapToEntity();
                        entity.AssetDeclarationId = assetDeclaration.Id;
                        return entity;
                    }).ToList();
            }

            if (req.RealEstate != null)
            {
                var existing = await _dataContext.RealEstate
                    .Where(x => x.AssetDeclarationId == req.Id)
                    .ToListAsync();
                _dataContext.RealEstate.RemoveRange(existing);

                assetDeclaration.RealEstate = req.RealEstate
                    .Select(x =>
                    {
                        var entity = x.MapToEntity();
                        entity.AssetDeclarationId = assetDeclaration.Id;
                        return entity;
                    }).ToList();
            }

            if (req.Liabilities != null)
            {
                var existing = await _dataContext.Liabilities
                    .Where(x => x.AssetDeclarationId == req.Id)
                    .ToListAsync();
                _dataContext.Liabilities.RemoveRange(existing);

                assetDeclaration.Liabilities = req.Liabilities
                    .Select(x =>
                    {
                        var entity = x.MapToEntity();
                        entity.AssetDeclarationId = assetDeclaration.Id;
                        return entity;
                    }).ToList();
            }

            if (req.PersonalProperties != null)
            {
                var existing = await _dataContext.PersonalProperties
                    .Where(x => x.AssetDeclarationId == req.Id)
                    .ToListAsync();
                _dataContext.PersonalProperties.RemoveRange(existing);

                assetDeclaration.PersonalProperties = req.PersonalProperties
                    .Select(x =>
                    {
                        var entity = x.MapToEntity();
                        entity.AssetDeclarationId = assetDeclaration.Id;
                        return entity;
                    }).ToList();
            }

            if (req.Incomes != null)
            {
                var existing = await _dataContext.Incomes
                    .Where(x => x.AssetDeclarationId == req.Id)
                    .ToListAsync();
                _dataContext.Incomes.RemoveRange(existing);

                assetDeclaration.Incomes = req.Incomes
                    .Select(x =>
                    {
                        var entity = x.MapToEntity();
                        entity.AssetDeclarationId = assetDeclaration.Id;
                        return entity;
                    }).ToList();
            }

            if (req.Receivables != null)
            {
                var existing = await _dataContext.Receivables
                    .Where(x => x.AssetDeclarationId == req.Id)
                    .ToListAsync();
                _dataContext.Receivables.RemoveRange(existing);

                assetDeclaration.Receivables = req.Receivables
                    .Select(x =>
                    {
                        var entity = x.MapToEntity();
                        entity.AssetDeclarationId = assetDeclaration.Id;
                        return entity;
                    }).ToList();
            }

            if (req.BusinessActivities != null)
            {
                var existing = await _dataContext.BusinessActivities
                    .Where(x => x.AssetDeclarationId == req.Id)
                    .ToListAsync();
                _dataContext.BusinessActivities.RemoveRange(existing);

                assetDeclaration.BusinessActivities = req.BusinessActivities
                    .Select(x =>
                    {
                        var entity = x.MapToEntity();
                        entity.AssetDeclarationId = assetDeclaration.Id;
                        return entity;
                    }).ToList();
            }


            assetDeclaration.CalculateNetValue();

            await _dataContext.SaveChangesAsync();

            return TypedResults.Ok();
        }
    }
}
