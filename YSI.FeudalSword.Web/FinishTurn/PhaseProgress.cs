using Microsoft.EntityFrameworkCore;
using System.Linq;
using YSI.FeudalSword.Web.Database;

namespace YSI.FeudalSword.Web.FinishTurn
{
    public static class PhaseProgress
    {
        public static void Execute(ApplicationDbContext context)
        {
            var commands = context.Commands
                .Include(c => c.Character)
                .Include("Character.Titles")
                .Where(c => c.CommandType == Database.Enums.enCommandType.WarrioirGathering)
                .ToList();

            foreach (var command in commands)
            {
                var character = command.Character;
                var characterDomainCount = character.Titles
                    .Count(t => t.Rank == Database.Enums.enTitleRank.Earl);
                character.WarrioirCount += characterDomainCount * 100;
                context.Update(character);

                command.CommandType = Database.Enums.enCommandType.IsOver;
                context.Update(command);

                context.SaveChanges();
            }

        }
    }
}
