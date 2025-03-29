using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Party> Parties { get; set; }
        public DbSet<AssetDeclaration> AssetDeclarations { get; set; }

        public DbSet<CashPosition> CashPositions { get; set; }
        public DbSet<SecurityPosition> SecurityPositions { get; set; }
        public DbSet<RealEstate> RealEstate { get; set; }
        public DbSet<Liability> Liabilities { get; set; }
        public DbSet<PersonalProperty> PersonalProperties { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Receivable> Receivables { get; set; }
        public DbSet<BusinessActivity> BusinessActivities { get; set; }
    }
}
