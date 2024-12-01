using AssetDeclarationsApi.Data;
using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace AssetDeclarationsApi.Services.DatabaseServices
{
    public class PersonDataService : DatabaseService<Person>, IPersonDataService
    {
        public PersonDataService(DataContext context) : base(context) { }

        public Task<Person?> GetIncludingDetails(int id)
        {
            return DbSet.Include(x => x.Party)
            .Include(p => p.AssetDeclarations)
                .ThenInclude(ad => ad.CashPositions)
            .Include(p => p.AssetDeclarations)
                .ThenInclude(ad => ad.SecurityPositions)
            .Include(p => p.AssetDeclarations)
                .ThenInclude(ad => ad.RealEstate)
            .Include(p => p.AssetDeclarations)
                .ThenInclude(ad => ad.Liabilities)
            .Include(p => p.AssetDeclarations)
                .ThenInclude(ad => ad.PersonalProperties)
            .Include(p => p.AssetDeclarations)
                .ThenInclude(ad => ad.Incomes)
            .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}

