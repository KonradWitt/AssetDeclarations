using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Mappers;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.RealEstate
{
    public record GetAllPaginatedRequest
    {
        public int Page { get; set; } = 0;
        public int PageSize { get; set; } = 10;

        public record GetAllPaginatedResponse
        {
            public PersonDTO? Person { get; set; }
            public RealEstateDTO? RealEstate { get; set; }
        }
        public class GetAllPaginated : EndpointBase<GetAllPaginatedRequest, IEnumerable<GetAllPaginatedResponse>>
        {
            public readonly DataContext _dataContext;

            public GetAllPaginated(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public override void Configure()
            {
                Get($"{Route}");
                AllowAnonymous();
            }

            public override async Task<IEnumerable<GetAllPaginatedResponse>> ExecuteAsync(GetAllPaginatedRequest req, CancellationToken ct)
            {
                var realEstatesWithPersons = await _dataContext.Persons
                .Include(p => p.Party)
                .Select(p => new
                {
                    Person = p,
                    LatestDeclaration = p.AssetDeclarations
                        .OrderByDescending(ad => ad.Date)
                        .Take(1)
                })
                .SelectMany(x => x.LatestDeclaration
                    .SelectMany(ad => ad.RealEstate
                        .Select(re => new
                        {
                            Person = x.Person,
                            RealEstate = re
                        })
                    )
                )
                .OrderByDescending(x => x.RealEstate.Value)
                .Skip(req.Page * req.PageSize).Take(req.PageSize)
                .ToListAsync();

                var queryResult = realEstatesWithPersons.Select(x => (x.Person, x.RealEstate)).ToList();

                var response = queryResult.Select(x => new GetAllPaginatedResponse() { Person = x.Person.MapToDTO(), RealEstate = x.RealEstate.MapToDTO() });
                return response;
            }
        }
    }
}
