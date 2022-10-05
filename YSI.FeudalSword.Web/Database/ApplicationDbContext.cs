using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using YSI.FeudalSword.Web.Database.Models;
using YSI.FeudalSword.Web.Database.PregenData;

namespace YSI.FeudalSword.Web.Database
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public DbSet<Character> Characters { get; set; }
        public DbSet<Dynasty> Dynasties { get; set; }
        public DbSet<Title> Titles { get; set; }
        public DbSet<Domain> Domains { get; set; }
        public DbSet<Turn> Turns { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Army> Armies { get; set; }
        public DbSet<Command> Commands { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
               : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            CreateUsers(builder);
            CreateDynasties(builder);
            CreateCharacters(builder);
            CreateTitles(builder);
            CreateDomains(builder);
            CreateTurns(builder);
            CreateUnits(builder);
            CreateArmies(builder);
            CreateCommands(builder);

            PregenearateData(builder);
        }

        private void CreateUsers(ModelBuilder builder)
        {
            var model = builder.Entity<User>();
            model.HasKey(x => x.Id);

            model.HasIndex(x => x.LastActivity);
        }

        private void CreateDynasties(ModelBuilder builder)
        {
            var model = builder.Entity<Dynasty>();
            model.HasKey(x => x.Id);
        }

        private void CreateCharacters(ModelBuilder builder)
        {
            var model = builder.Entity<Character>();
            model.HasKey(x => x.Id);

            model.HasIndex(x => x.DynastyId);
            model.HasOne(x => x.Dynasty)
                .WithMany(x => x.Characters)
                .HasForeignKey(x => x.DynastyId)
                .OnDelete(DeleteBehavior.Restrict);

            model.HasIndex(x => x.UserId);
            model.HasOne(x => x.User)
                .WithMany(x => x.Characters)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            model.HasIndex(x => x.SuzerainId);
            model.HasOne(x => x.Suzerain)
                .WithMany(x => x.Vassals)
                .HasForeignKey(x => x.SuzerainId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void CreateTitles(ModelBuilder builder)
        {
            var model = builder.Entity<Title>();
            model.HasKey(x => x.Id);

            model.HasIndex(x => x.Rank);

            model.HasIndex(x => x.OwnerId);
            model.HasOne(x => x.Owner)
                .WithMany(x => x.Titles)
                .HasForeignKey(x => x.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            model.HasIndex(x => new { x.CapitalId, x.Rank });
            model.HasOne(x => x.Capital)
                .WithMany(x => x.Titles)
                .HasForeignKey(x => x.CapitalId)
                .OnDelete(DeleteBehavior.Cascade);

            model.HasIndex(x => x.JureSuzerainId);
            model.HasOne(x => x.JureSuzerain)
                .WithMany(x => x.JureVassals)
                .HasForeignKey(x => x.JureSuzerainId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void CreateDomains(ModelBuilder builder)
        {
            var model = builder.Entity<Domain>();
            model.HasKey(x => x.Id);
        }

        private void CreateTurns(ModelBuilder builder)
        {
            var model = builder.Entity<Turn>();
            model.HasKey(x => x.Id);

            model.HasIndex(x => x.Status);
        }

        private void CreateUnits(ModelBuilder builder)
        {
            var model = builder.Entity<Unit>();
            model.HasKey(x => x.Id);

            model.HasIndex(x => x.ArmyId);
            model.HasOne(x => x.Army)
                .WithMany(x => x.Units)
                .HasForeignKey(x => x.ArmyId)
                .OnDelete(DeleteBehavior.Restrict);

            model.HasIndex(x => x.OwnerId);
            model.HasOne(x => x.Owner)
                .WithMany(x => x.Units)
                .HasForeignKey(x => x.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            model.HasIndex(x => x.HomelandId);
            model.HasOne(x => x.Homeland)
                .WithMany(x => x.UnitsFromHere)
                .HasForeignKey(x => x.HomelandId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void CreateArmies(ModelBuilder builder)
        {
            var model = builder.Entity<Army>();
            model.HasKey(x => x.Id);

            model.HasIndex(x => x.CommanderId);
            model.HasOne(x => x.Commander)
                .WithMany(x => x.Armies)
                .HasForeignKey(x => x.CommanderId)
                .OnDelete(DeleteBehavior.Restrict);

            model.HasIndex(x => x.LocationId);
            model.HasOne(x => x.Location)
                .WithMany(x => x.ArmiesHere)
                .HasForeignKey(x => x.LocationId)
                .OnDelete(DeleteBehavior.Cascade);

            model.HasIndex(x => x.DayOfTurn);
        }

        private void CreateCommands(ModelBuilder builder)
        {
            var model = builder.Entity<Command>();
            model.HasKey(x => x.Id);

            model.HasIndex(x => x.CharacterId);
            model.HasOne(x => x.Character)
                .WithMany(x => x.Commands)
                .HasForeignKey(x => x.CharacterId)
                .OnDelete(DeleteBehavior.Cascade);

            model.HasIndex(x => new { x.CommandType, x.CommandTargetId });
        }

        private void PregenearateData(ModelBuilder builder)
        {
            builder.Entity<Domain>().HasData(PregenDomains.Get());
            builder.Entity<Dynasty>().HasData(PregenDynasties.Get());
            builder.Entity<Character>().HasData(PregenCharacters.Get());
            builder.Entity<Title>().HasData(PregenTitles.Get());
            builder.Entity<Army>().HasData(PregenArmies.Get());
            builder.Entity<Unit>().HasData(PregenUnits.Get());
        }
    }
}
