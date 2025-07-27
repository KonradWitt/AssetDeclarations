using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Person
{
    public record UpdateRequest(int Id, string FirstName, string LastName, string PlaceOfBirth, DateTime DateOfBirth, string ImageUrl, bool IsHighlight, int? PartyId);

    public class Update : EndpointBase<UpdateRequest, Results<Ok<PersonDTO>, NotFound>>
    {
        private readonly DataContext _dataContext;

        public Update(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Put($"{Route}");
            Policies("ADMIN");
        }

        public override async Task<Results<Ok<PersonDTO>, NotFound>> ExecuteAsync(UpdateRequest req, CancellationToken ct)
        {
            var person = await _dataContext.Persons.FindAsync(req.Id);
            if (person == null)
            {
                return TypedResults.NotFound();
            }

            person.FirstName = req.FirstName;
            person.LastName = req.LastName;
            person.PlaceOfBirth = req.PlaceOfBirth;
            person.DateOfBirth = req.DateOfBirth;
            person.ImageUrl = req.ImageUrl;
            person.IsHighlight = req.IsHighlight;
            person.PartyId = req.PartyId;

            await _dataContext.SaveChangesAsync();
            return TypedResults.Ok(person.MapToDTO());
        }
    }
}
