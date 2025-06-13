using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Mappers;
using AssetDeclarationsApi.Utilities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Party
{

    public record GetAverageNetWorthResponse
    {
        public PartyDTO? Party { get; set; }
        public decimal? AverageNetWorth { get; set; }

        public decimal? MedianNetWorth { get; set; }
    }

    public class GetAverageNetWorth : EndpointBase<List<GetAverageNetWorthResponse>>
    {
        public readonly DataContext _dataContext;

        public GetAverageNetWorth(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get($"{Route}");
            AllowAnonymous();
        }

        public override async Task<List<GetAverageNetWorthResponse>> ExecuteAsync(CancellationToken ct)
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
                AverageNetValue = group.Average(x => x.LatestAssetDeclaration!.NetValue),
                MedianNetValue = (group.Select(x => x.LatestAssetDeclaration!.NetValue)).GetMedian()
            })
            .ToListAsync();

            var result = query.Select(x => (x.Party, x.AverageNetValue, x.MedianNetValue)).ToList();

            var response = result.Select(x => new GetAverageNetWorthResponse()
            {
                Party = x.Party.MapToDTO(),
                AverageNetWorth = x.AverageNetValue,
                MedianNetWorth = x.MedianNetValue
            }).ToList();

            return response;
        }
    }
}
