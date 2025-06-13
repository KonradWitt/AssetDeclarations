using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Mappers;
using AssetDeclarationsApi.Utilities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Party
{
    public record GetAverageRealEstateCountRequest
    {
        public decimal MinValue { get; set; }
    }

    public record GetAverageRealEstateCountResponse
    {
        public PartyDTO? Party { get; set; }
        public double? AverageRealEstateCount { get; set; }
    }

    public class GetAverageRealEstateCount : EndpointBase<GetAverageRealEstateCountRequest, IEnumerable<GetAverageRealEstateCountResponse>>
    {
        public readonly DataContext _dataContext;

        public GetAverageRealEstateCount(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get($"{Route}");
            AllowAnonymous();
        }

        public override async Task<IEnumerable<GetAverageRealEstateCountResponse>> ExecuteAsync(GetAverageRealEstateCountRequest req, CancellationToken ct)
        {
            var query = await _dataContext.Persons
            .Select(p => new
            {
                Person = p,
                LatestAssetDeclaration = p.AssetDeclarations.OrderByDescending(ad => ad.Date).FirstOrDefault()
            })
            .Where(x => x.LatestAssetDeclaration != null)
            .GroupBy(x => x.Person.Party)
            .Select(group => new
            {
                Party = group.Key,
                AverageRealEstateCount = group.Average(x => x.LatestAssetDeclaration!.RealEstate.Where(r => r.Value > req.MinValue).Count())
            })
            .ToListAsync();

            var result = query.Select(x => (x.Party, x.AverageRealEstateCount)).ToList();

            var response = result.Select(qr => new GetAverageRealEstateCountResponse()
            {
                Party = qr.Party.MapToDTO(),
                AverageRealEstateCount = qr.AverageRealEstateCount
            });

            return response;
        }
    }
}
