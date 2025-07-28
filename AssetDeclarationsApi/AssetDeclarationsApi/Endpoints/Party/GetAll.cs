using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Mappers;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Party
{
    public class GetAll : EndpointBase<IEnumerable<PartyDTO>>
    {
        public readonly DataContext _dataContext;

        public GetAll(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get($"{Route}");
            AllowAnonymous();
        }

        public override async Task<IEnumerable<PartyDTO>> ExecuteAsync(CancellationToken ct)
        {
            var parties = await _dataContext.Parties.ToListAsync(ct);

            return parties.Select(x => x.MapToDTO());
        }
    }
}
