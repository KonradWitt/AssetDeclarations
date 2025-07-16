using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Person
{
    public enum SortKey
    {
        LastName,
        NetWorth
    }

    public enum SortDirection
    {
        Asc,
        Desc
    }

    public record GetListRequest(int Page, int PageSize, List<int>? PartiesIds, SortKey? SortKey, SortDirection? SortDirection);
    public record GetListResponse(string FullName, string Link, string ImageUrl, decimal NetWorth, PartyDTO Party);

    public class PersonWithNetWorth
    {
        public Entities.Person Person { get; set; }
        public decimal NetWorth { get; set; }
    }

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
            var query = _dataContext.Persons
                                    .Include(x => x.Party)
                                    .AsQueryable();

            if (req.PartiesIds != null)
            {
                query = query.Where(x => x.PartyId != null && req.PartiesIds.Contains((int)x.PartyId));
            }

            var projectedQuery = query.Select(p => new PersonWithNetWorth
            {
                Person = p,
                NetWorth = p.AssetDeclarations
                    .OrderByDescending(ad => ad.Date)
                    .First().NetValue
            });

            IOrderedQueryable<PersonWithNetWorth> sortedQuery;

            if (req.SortKey is null)
            {
                sortedQuery = projectedQuery.OrderBy(p => p.Person.LastName);
            }
            else
            {
                switch (req.SortKey)
                {
                    case SortKey.LastName:
                        sortedQuery = (req.SortDirection == SortDirection.Desc)
                            ? projectedQuery.OrderByDescending(p => p.Person.LastName)
                            : projectedQuery.OrderBy(p => p.Person.LastName); 
                        break;

                    case SortKey.NetWorth:
                        sortedQuery = (req.SortDirection == SortDirection.Asc)
                            ? projectedQuery.OrderBy(p => p.NetWorth)
                            : projectedQuery.OrderByDescending(p => p.NetWorth); 
                        break;

                    default:
                        sortedQuery = projectedQuery.OrderBy(p => p.Person.LastName);
                        break;
                }
            }



            var queryResult = await sortedQuery
                .Skip(req.Page * req.PageSize)
                .Take(req.PageSize)
                .ToListAsync();

            if (queryResult is null)
            {
                return TypedResults.NotFound();
            }

            var response = queryResult.Select(q => new GetListResponse(q.Person.FullName, q.Person.Link, q.Person.ImageUrl, q.NetWorth, q.Person.Party.MapToDTO())).ToList();

            return TypedResults.Ok(response);
        }
    }
}
