using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AssetDeclarationsApi.Services
{
    public class DatabaseService : IDatabaseService
    {
        private readonly DataContext _context;

        public DatabaseService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<T>> GetAllAsync<T>() where T : class
        {
            var dbSet = _context.Set<T>();
            return await dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync<T>(int id) where T : class
        {
            var dbSet = _context.Set<T>();
            return await dbSet.FindAsync(id);
        }

        public async Task<T> AddAsync<T>(T entity) where T : class
        {
            var dbSet = _context.Set<T>();

            var result = await dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task UpdateAsync<T>(T entity) where T : class
        {
            var dbSet = _context.Set<T>();

            dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync<T>(int id) where T : class
        {
            var dbSet = _context.Set<T>();

            var entity = await dbSet.FindAsync(id);
            if (entity != null)
            {
                dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Person?> GetPersonIncludingDetailsAsync(int id)
        {
            var person = _context.Persons.Include(x => x.Party).FirstOrDefault(x => x.Id == id);
            if (person is null)
            {
                return null;
            }
            person.AssetDeclarations = await _context.AssetDeclarations.Where(x => x.PersonId == person.Id).ToListAsync();
            foreach (var ad in person.AssetDeclarations)
            {
                ad.CashPositions = await _context.CashPositions.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.SecurityPositions = await _context.SecurityPositions.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.RealEstate = await _context.RealEstate.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.Liabilities = await _context.Liabilities.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.PersonalProperties = await _context.PersonalProperties.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.Incomes = await _context.Incomes.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.Receivables = await _context.Receivables.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
                ad.BusinessActivities = await _context.BusinessActivities.Where(x => x.AssetDeclarationId == ad.Id).ToListAsync();
            }

            return person;
        }

        public async Task<Person?> GetPersonIncludingDetailsByLinkAsync(string link)
        {
            var person = await _context.Persons.FirstOrDefaultAsync(x => x.Link == link);
            if (person is null)
            {
                return null;
            }

            return await GetPersonIncludingDetailsAsync(person.Id);
        }

        public async Task<IEnumerable<Person>> GetHighlightsAsync()
        {
            var highlights = await _context.Persons.Where(x => x.IsHighlight)
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

        public async Task<List<(Person Person, int RealEstateCount)>> GetAllPersonsWithRealEstateCountAsync(decimal minValue)
        {
            var query = await _context.Persons.Select(p => new
            {
                Person = p,
                RealEstateCount = p.AssetDeclarations
                                       .OrderByDescending(ad => ad.Date)
                                       .Take(1)
                                       .SelectMany(ad => ad.RealEstate).Where(re => re.Value >= minValue).Count()
            }).ToListAsync();

            var result = query.Select(x => (x.Person, x.RealEstateCount)).ToList();

            return result;
        }

        public async Task<List<(Person Person, RealEstate RealEstate)>> GetAllRealEstateAsync(int page, int pageSize)
        {
            var realEstatesWithPersons = await _context.Persons
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
                .Skip(page * pageSize).Take(pageSize)
                .ToListAsync();

            return realEstatesWithPersons.Select(x => (x.Person, x.RealEstate)).ToList();
        }

        public async Task<int> GetNumberOfRealEstatesAsync()
        {
            var count = await _context.Persons
                .Select(p => new
                {
                    Person = p,
                    LatestDeclaration = p.AssetDeclarations
                        .OrderByDescending(ad => ad.Date)
                        .Take(1)
                })
                .SelectMany(x => x.LatestDeclaration
                    .SelectMany(ad => ad.RealEstate)
                ).CountAsync();

            return count;
        }


        public async Task<AssetDeclaration> UpdateAssetDeclarationAsync(AssetDeclaration assetDeclaration)
        {
            var cashPositions = await _context.CashPositions.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync();
            _context.CashPositions.RemoveRange(cashPositions);
            _context.SecurityPositions.RemoveRange(await _context.SecurityPositions.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _context.RealEstate.RemoveRange(await _context.RealEstate.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _context.Liabilities.RemoveRange(await _context.Liabilities.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _context.PersonalProperties.RemoveRange(await _context.PersonalProperties.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _context.Incomes.RemoveRange(await _context.Incomes.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _context.Receivables.RemoveRange(await _context.Receivables.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());
            _context.BusinessActivities.RemoveRange(await _context.BusinessActivities.Where(x => x.AssetDeclarationId == assetDeclaration.Id).ToListAsync());

            await _context.SaveChangesAsync();
            _context.AssetDeclarations.Update(assetDeclaration);
            await _context.SaveChangesAsync();

            var ad = await _context.AssetDeclarations.FindAsync(assetDeclaration.Id);
            return ad;
        }

        public async Task<User?> GetUserByUserNameAsync(string userName)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        }

        public async Task<List<(Party Party, decimal AverageNetValue, decimal MedianNetValue)>> GetAverageNetWorthPerPartyAsync()
        {
            var query = await _context.Persons
            .Select(p => new
            {
                Person = p,
                LatestAssetDeclaration = p.AssetDeclarations.OrderByDescending(ad => ad.Date).FirstOrDefault()
            })
            .Where(x => x.LatestAssetDeclaration != null)
            .GroupBy(x => x.Person.Party)
            .Select(group => new
            {
                Party = group.Key,
                AverageNetValue = group.Average(x => x.LatestAssetDeclaration!.NetValue),
                MedianNetValue = GetMedian(group.Select(x => x.LatestAssetDeclaration!.NetValue))
            })
            .ToListAsync();

            var result = query.Select(x => (x.Party, x.AverageNetValue, x.MedianNetValue)).ToList();

            return result;
        }


        public async Task<List<(Party Party, double AverageRealEstateCount)>> GetAverageRealEstateCountPerPartyAsync(decimal minValue)
        {
            var query = await _context.Persons
            .Select(p => new
            {
                Person = p,
                LatestAssetDeclaration = p.AssetDeclarations.OrderByDescending(ad => ad.Date).FirstOrDefault()
            })
            .Where(x => x.LatestAssetDeclaration != null)
            .GroupBy(x => x.Person.Party)
            .Select(group => new
            {
                Party = group.Key,
                AverageRealEstateCount = group.Average(x => x.LatestAssetDeclaration!.RealEstate.Where(r => r.Value > minValue).Count())
            })
            .ToListAsync();

            var result = query.Select(x => (x.Party, x.AverageRealEstateCount)).ToList();

            return result;
        }

        private static decimal GetMedian(IEnumerable<decimal> input)
        {
            var sortedList = input.OrderBy(x => x).ToList();
            int count = sortedList.Count;
            if (count == 0)
            {
                return 0;
            }

            if (count % 2 == 0)
            {
                return (sortedList[count / 2 - 1] + sortedList[count / 2]) / 2;
            }
            else
            {
                return sortedList[count / 2];
            }
        }

    }
}

