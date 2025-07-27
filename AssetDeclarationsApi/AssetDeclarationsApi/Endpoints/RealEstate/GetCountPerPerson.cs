using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Mappers;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.RealEstate
{
    public record GetCountPerPersonRequest
    {
        public decimal MinValue { get; set; }
    }

    public record GetCountPerPersonResponse
    {
        public PersonDTO? Person { get; set; }
        public int RealEstateCount { get; set; }
    }
    public class GetCountPerPerson : EndpointBase<GetCountPerPersonRequest, IEnumerable<GetCountPerPersonResponse>>
    {

        public readonly DataContext _dataContext;

        public GetCountPerPerson(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get($"{Route}");
            AllowAnonymous();
        }

        public override async Task<IEnumerable<GetCountPerPersonResponse>> ExecuteAsync(GetCountPerPersonRequest req, CancellationToken ct)
        {
            var query = await _dataContext.Persons.Select(p => new
            {
                Person = p,
                RealEstateCount = p.AssetDeclarations
                                       .OrderByDescending(ad => ad.Date)
                                       .Take(1)
                                       .SelectMany(ad => ad.RealEstate).Where(re => re.Value >= req.MinValue).Count()
            }).ToListAsync();

            var response = query.Select(qr => new GetCountPerPersonResponse()
            {
                Person = qr.Person.MapToDTO(),
                RealEstateCount = qr.RealEstateCount
            });

            return response;
        }
    }
}
