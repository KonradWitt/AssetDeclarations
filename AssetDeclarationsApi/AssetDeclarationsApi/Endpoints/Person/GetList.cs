using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Person
{

    public record GetListRequest(int Page, int PageSize);
    public record GetListResponse(string FullName, string Link, string ImageUrl, decimal NetWorth, PartyDTO Party);

    public class GetList : EndpointBase<GetListRequest, Results<Ok<List<GetListResponse>>, NotFound>>
    {
        private readonly DataContext _dataContext;

        public GetList(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get(Route);
            AllowAnonymous();
        }

        public override async Task<Results<Ok<List<GetListResponse>>, NotFound>> ExecuteAsync(GetListRequest req, CancellationToken ct)
        {
            var queryResult = await _dataContext.Persons.Include(x => x.Party).OrderBy(x => x.LastName).Skip(req.Page * req.PageSize).Take(req.PageSize)
                .Select(p => new
                {
                    Person = p,
                    NetWorth = p.AssetDeclarations
                        .OrderByDescending(ad => ad.Date)
                        .FirstOrDefault().NetValue,
                }).ToListAsync(ct);

            if (queryResult is null)
            {
                return TypedResults.NotFound();
            }


            var response = queryResult.Select(q => new GetListResponse(q.Person.FullName, q.Person.Link, q.Person.ImageUrl, q.NetWorth, q.Person.Party.MapToDTO())).ToList();

            return TypedResults.Ok(response);
        }
    }
}
