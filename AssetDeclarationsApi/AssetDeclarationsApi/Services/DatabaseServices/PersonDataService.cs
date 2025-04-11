using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace AssetDeclarationsApi.Services.DatabaseServices
{
    public class PersonDataService : DatabaseService<Person>, IPersonDataService
    {
        public PersonDataService(DataContext context) : base(context) { }



        public async Task<Person?> GetIncludingDetails(int id)
        {
            var person = DbSet.FirstOrDefault(x => x.Id == id);
            if (person is null)
            {
                return null;
            }

            person.AssetDeclarations = await Context.AssetDeclarations.Where(x => x.PersonId == person.Id).ToListAsync();
            foreach (var ad in person.AssetDeclarations)
            {
                ad.CashPositions = await Context.CashPositions.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.SecurityPositions = await Context.SecurityPositions.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.RealEstate = await Context.RealEstate.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.Liabilities = await Context.Liabilities.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.PersonalProperties = await Context.PersonalProperties.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.Incomes = await Context.Incomes.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.Receivables = await Context.Receivables.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.BusinessActivities = await Context.BusinessActivities.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
            }

            return person;
        }

        public async Task<IEnumerable<Person>> GetHighlightsAsync()
        {
            return await DbSet.Where(x => x.IsHighlight).ToListAsync();
        }
    }
}

