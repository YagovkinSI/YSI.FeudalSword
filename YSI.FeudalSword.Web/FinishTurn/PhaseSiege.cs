using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using YSI.FeudalSword.Web.Database;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.FinishTurn
{
    public static class PhaseSiege
    {
        public static void Execute(ApplicationDbContext context)
        {
            var commands = context.Commands
                .Include(c => c.Character)
                .Include("Character.Titles")
                .Where(c => c.CommandType == Database.Enums.enCommandType.Siege)
                .ToList()
                .OrderBy(c => c.Character.Titles.Count);

            foreach (var command in commands)
            {
                CkeckSiegeCommand(command, context);
                context.SaveChanges();
            }
        }

        private static void CkeckSiegeCommand(Command command, ApplicationDbContext context)
        {
            var sourceCharacter = command.Character;
            var target = context.Domains
                .Include(c => c.Titles)
                .Include("Titles.Owner")
                .Single(c => c.Id == command.CommandTargetId);
            var targetCharacter = target.Titles
                .Single(t => t.Rank == Database.Enums.enTitleRank.Earl)
                .Owner;

            BattleHelper.Siege(sourceCharacter, targetCharacter, context);
            var isSourceWin = BattleHelper.BattleOnField(sourceCharacter, targetCharacter, context);
            if (isSourceWin)
            {
                var targetTitle = context.Titles
                    .Single(t => t.Rank == Database.Enums.enTitleRank.Earl &&
                        t.CapitalId == command.CommandTargetId);
                targetTitle.OwnerId = command.CharacterId;
                context.Update(targetTitle);
            }

            command.CommandType = Database.Enums.enCommandType.IsOver;
            context.Update(command);
        }
    }
}
