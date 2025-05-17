using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.DTOs.Person;
using AssetDeclarationsApi.Mappers;
using AssetDeclarationsApi.Services;
using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Person
{
    public record GetRequest(int id);
    public class Get : EndpointBase<GetRequest, Results<Ok<PersonDTO>, NotFound>>
    {
        private readonly DataContext _dataContext;

        public Get(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get($"{Route}/{{id}}");
            AllowAnonymous();
        }

        public override async Task<Results<Ok<PersonDTO>, NotFound>> ExecuteAsync(GetRequest req, CancellationToken ct)
        {
            var person = await _dataContext.Persons.Include(x => x.Party).Include(x => x.AssetDeclarations).FirstOrDefaultAsync(x => x.Id == req.id, ct);

            if (person is null)
            {
                return TypedResults.NotFound();
            }

            foreach (var ad in person.AssetDeclarations)
            {
                ad.CashPositions = await _dataContext.CashPositions.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync(ct);
                ad.SecurityPositions = await _dataContext.SecurityPositions.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync(ct);
                ad.RealEstate = await _dataContext.RealEstate.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync(ct);
                ad.Liabilities = await _dataContext.Liabilities.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync(ct);
                ad.PersonalProperties = await _dataContext.PersonalProperties.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync(ct);
                ad.Incomes = await _dataContext.Incomes.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync(ct);
                ad.Receivables = await _dataContext.Receivables.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync(ct);
                ad.BusinessActivities = await _dataContext.BusinessActivities.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync(ct);
            }


            var response = person.MapToDTO();

            return TypedResults.Ok(response);
        }
    }
}
