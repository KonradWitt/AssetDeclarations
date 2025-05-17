using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update;

namespace AssetDeclarationsApi.Endpoints.Person
{
    public record GetAllResponse(string FullName, string Link);

    public class GetAll : EndpointBaseWithoutRequest<Results<Ok<List<GetAllResponse>>, NotFound>>
    {
        private readonly DataContext _dataContext;

        public GetAll(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get(Route);
            AllowAnonymous();
        }

        public override async Task<Results<Ok<List<GetAllResponse>>, NotFound>> ExecuteAsync(CancellationToken ct)
        {
            var persons = await _dataContext.Persons.ToListAsync(ct);

            if (persons is null)
            {
                return TypedResults.NotFound();
            }

            var response = persons.Select(p => new GetAllResponse(p.FullName, p.Link)).ToList();

            return TypedResults.Ok(response);
        }
    }
}

