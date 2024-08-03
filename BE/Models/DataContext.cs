using Microsoft.EntityFrameworkCore;
using BE.Models.Domain;

namespace BE.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<QuestionEntity> Questions { get; set; }
        public DbSet<Choice> Choices { get; set; }
        public DbSet<UserEntity> User { get; set; }
        public DbSet<ScoreEntity> Scores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuestionEntity>()
                .HasMany(q => q.Choices)
                .WithOne(c => c.Question)
                .HasForeignKey(c => c.QuestionID)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }

}