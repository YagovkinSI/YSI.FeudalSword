using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using YSI.FeudalSword.Web.Database;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.FinishTurn
{
    public static class PhaseAttack
    {
        public static void Execute(ApplicationDbContext context)
        {
            var commands = context.Commands
                .Include(c => c.Character)
                .Include("Character.Titles")
                .Where(c => c.CommandType == Database.Enums.enCommandType.CapturingDomain)
                .ToList()
                .OrderBy(c => c.Character.Titles.Count);

            foreach (var command in commands)
            {
                if (command.CommandType == Database.Enums.enCommandType.IsOver)
                    continue;

                if (context.Commands.Any(c => c.CommandType == Database.Enums.enCommandType.Siege &&
                    c.CommandTargetId == command.CommandTargetId))
                {
                    command.CommandType = Database.Enums.enCommandType.IsOver;
                    context.Update(command);
                    context.SaveChanges();
                    continue;
                }

                CkeckAttackCommand(command, context);
                context.SaveChanges();
            }
        }

        private static void CkeckAttackCommand(Command attackCommand, ApplicationDbContext context)
        {
            var sourceCharacter = attackCommand.Character;
            var target = context.Domains
                .Include(c => c.Titles)
                .Include("Titles.Owner")
                .Single(c => c.Id == attackCommand.CommandTargetId);
            var targetCharacter = target.Titles
                .Single(t => t.Rank == Database.Enums.enTitleRank.Earl)
                .Owner;

            if (targetCharacter.WarrioirCount > sourceCharacter.WarrioirCount * 1.2)
            {
                var isSourceWin = BattleHelper.BattleOnField(sourceCharacter, targetCharacter, context);
                if (!isSourceWin)
                {
                    attackCommand.CommandType = Database.Enums.enCommandType.IsOver;
                    context.Update(attackCommand);
                    return;
                }
            }

            SiegeStart(sourceCharacter, targetCharacter, context);
            attackCommand.CommandType = Database.Enums.enCommandType.Siege;
            context.Update(attackCommand);
        }

        private static void SiegeStart(Character sourceCharacter, Character targetCharacter, 
            ApplicationDbContext context)
        {
            var targetCommand = context.Commands
                .SingleOrDefault(c => c.CharacterId == targetCharacter.Id);
            if (targetCommand == null)
                return;
            targetCommand.CommandType = Database.Enums.enCommandType.IsOver;
            context.Update(targetCommand);
            return;
        }
    }
}
