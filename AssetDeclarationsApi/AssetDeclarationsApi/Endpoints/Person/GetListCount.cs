using AssetDeclarationsApi.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Person
{
    public record GetListCountRequest(List<int>? PartiesIds);

    public class GetListCount : EndpointBase<GetListCountRequest, Ok<int>>
    {
        private DataContext _dataContext;

        public GetListCount(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get(Route);
            AllowAnonymous();
        }

        public override async Task<Ok<int>> ExecuteAsync(GetListCountRequest req, CancellationToken ct)
        {
            var query = _dataContext.Persons
                                    .Include(x => x.Party)
                                    .AsQueryable();

            if (req.PartiesIds != null)
            {
                query = query.Where(x => x.PartyId != null && req.PartiesIds.Contains((int)x.PartyId));
            }


            var count = await query.CountAsync(ct);

            return TypedResults.Ok(count);
        }
    }
}
