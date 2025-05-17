using AssetDeclarationsApi.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Person
{
    public record GetHighlightsResponse
    {
        public string? FullName { get; set; } = string.Empty;
        public string? Link { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public decimal NetWorth { get; set; }
    }

    public class GetHighlights : EndpointBaseWithoutRequest<Results<Ok<List<GetHighlightsResponse>>, NotFound>>
    {
        private DataContext _dataContext;

        public GetHighlights(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Get(Route);
            AllowAnonymous();
        }

        public override async Task<Results<Ok<List<GetHighlightsResponse>>, NotFound>> ExecuteAsync(CancellationToken ct)
        {
            var persons = await _dataContext.Persons.Where(p => p.IsHighlight).Include(p => p.AssetDeclarations).ToListAsync(ct);

            if (persons is null)
            {
                return TypedResults.NotFound();
            }

            var response = persons.Select(person => new GetHighlightsResponse()
            {
                FullName = person.FullName,
                Link = person.Link,
                ImageUrl = person.ImageUrl,
                NetWorth = person.AssetDeclarations?.FirstOrDefault()?.NetValue ?? 0
            }).ToList();

            return TypedResults.Ok(response);
        }
    }
}
