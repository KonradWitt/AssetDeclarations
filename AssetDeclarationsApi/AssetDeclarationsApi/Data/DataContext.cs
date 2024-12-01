using AssetDeclarationsApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Person> Persons { get; set; }
    }
}
