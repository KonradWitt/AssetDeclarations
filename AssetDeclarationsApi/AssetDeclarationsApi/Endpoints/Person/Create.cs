using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Mappers;
using Azure.Core;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Endpoints.Person
{
    public class Create : EndpointBase<PersonDTO, Results<Created, BadRequest>>
    {
        private readonly DataContext _dataContext;

        public Create(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public override void Configure()
        {
            Post($"{Route}");
            Policies("ADMIN");
            AllowAnonymous();
        }

        public override async Task<Results<Created, BadRequest>> ExecuteAsync(PersonDTO req, CancellationToken ct)
        {
            if (req is null)
            {
                return TypedResults.BadRequest();
            }

            var person = req.MapToEntity();

            if (person is not null && person.AssetDeclarations is not null)
            {
                foreach (var ad in person.AssetDeclarations)
                {
                    ad.CalculateNetValue();
                }
            }

            if (person.PlaceOfBirth is null)
            {
                person.PlaceOfBirth = string.Empty;
            }


            var createdPerson = (await _dataContext.AddAsync(person, ct)).Entity;
            await _dataContext.SaveChangesAsync(ct);

            var response = createdPerson.MapToDTO();


            return TypedResults.Created($"/Users/Get/{createdPerson.Id}");
        }
    }
}
