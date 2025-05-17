using AssetDeclarationsApi.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Person
{
    public class GetCount : EndpointBaseWithoutRequest<Ok<int>>
    {
        private DataContext _dataContext;

        public GetCount(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get(Route);
            AllowAnonymous();
        }

        public override async Task<Ok<int>> ExecuteAsync(CancellationToken ct)
        {
            var count = await _dataContext.Persons.CountAsync(ct);

            return TypedResults.Ok(count);
        }
    }
}
