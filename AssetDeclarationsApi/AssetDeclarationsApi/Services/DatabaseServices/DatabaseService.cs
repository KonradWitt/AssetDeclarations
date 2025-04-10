using AssetDeclarationsApi.Data;
using Microsoft.EntityFrameworkCore;

namespace AssetDeclarationsApi.Services.DatabaseServices
{
    public class DatabaseService<T> : IDatabaseService<T> where T : class
    {
        private readonly DataContext _context;
        private readonly DbSet<T> _dbSet;

        public DatabaseService(DataContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        protected DataContext Context { get => _context; }
        protected DbSet<T> DbSet { get => _dbSet; }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> AddAsync(T entity)
        {
            var result = await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
