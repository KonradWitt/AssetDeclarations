﻿using AssetDeclarationsApi.Entities;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Party>().HasData(
        new Party { Id = 1, Name = "Koalicja Obywatelska" },
        new Party { Id = 2, Name = "Konfederacja" },
        new Party { Id = 3, Name = "Lewica" },
        new Party { Id = 4, Name = "Niezrzeszeni" },
        new Party { Id = 5, Name = "PSL" },
        new Party { Id = 6, Name = "Polska 2050" },
        new Party { Id = 7, Name = "Prawo i Sprawiedliwość" },
        new Party { Id = 8, Name = "Razem" },
        new Party { Id = 9, Name = "Wolni Republikanie" }
    );
        }
    }
}
