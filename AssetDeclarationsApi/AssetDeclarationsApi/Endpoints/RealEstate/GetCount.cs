using AssetDeclarationsApi.Data;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.RealEstate
{
    public class GetCount : EndpointBase<int>
    {
        public readonly DataContext _dataContext;

        public GetCount(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get($"{Route}");
            AllowAnonymous();
        }

        public override async Task<int> ExecuteAsync(CancellationToken ct)
        {
            var count = await _dataContext.Persons
                .Select(p => new
                {
                    Person = p,
                    LatestDeclaration = p.AssetDeclarations
                        .OrderByDescending(ad => ad.Date)
                        .Take(1)
                })
                .SelectMany(x => x.LatestDeclaration
                    .SelectMany(ad => ad.RealEstate)
                ).CountAsync(ct);

            return count;
        }
    }
}
