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
            var person = DbSet.Include(x => x.Party).FirstOrDefault(x => x.Id == id);
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
            var highlights = await DbSet.Where(x => x.IsHighlight)
                .Select(p => new
                {
                    Person = p,
                    AssetDeclaration = p.AssetDeclarations
                        .OrderByDescending(ad => ad.Date)
                        .FirstOrDefault()
                }).ToListAsync();

            if (highlights is null || highlights.Count == 0)
            {
                return Enumerable.Empty<Person>();
            }

            var result = new List<Person>();
            foreach (var highlight in highlights)
            {
                var person = highlight.Person;
                person.AssetDeclarations = new List<AssetDeclaration>() { highlight.AssetDeclaration };
                result.Add(highlight.Person);
            }

            return result;
        }

        public async Task<IEnumerable<Person>> GetPersonsWithRecentRealEstate(decimal minValue)
        {
            var query = await DbSet.Select(p => new
            {
                Person = p,
                RealEstatesFromLatestAssetDeclaration = p.AssetDeclarations
                                        .OrderByDescending(ad => ad.Date)
                                        .Take(1)
                                        .SelectMany(ad => ad.RealEstate).Where(re => re.Value >= minValue)
            }).ToListAsync();

            var persons = query.Select(x =>
            {
                var person = x.Person;
                person.AssetDeclarations = new List<AssetDeclaration>() { new AssetDeclaration() { RealEstate = x.RealEstatesFromLatestAssetDeclaration?.ToList() } };
                return person;
            });

            return persons;
        }

    }
}

