using System;
using YSI.FeudalSword.Web.Database;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.FinishTurn
{
    public class BattleHelper
    {
        internal static bool BattleOnField(Character sourceCharacter, Character targetCharacter, 
            ApplicationDbContext context)
        {
            var random = new Random();
            var damageStep = Math.Min(sourceCharacter.WarrioirCount, targetCharacter.WarrioirCount) / 100;
            if (damageStep == 0)
                damageStep = 1;

            sourceCharacter.WarrioirCount -= random.Next(16, 30) * damageStep;
            context.Update(sourceCharacter);

            targetCharacter.WarrioirCount -= random.Next(8, 16) * damageStep;
            context.Update(targetCharacter);

            var ratio = (double)sourceCharacter.WarrioirCount / (double)targetCharacter.WarrioirCount;
            return (ratio * 100) > random.Next(90, 120);
        }

        internal static void Siege(Character sourceCharacter, Character targetCharacter,
            ApplicationDbContext context)
        {
            var random = new Random();
            var damageStep = Math.Min(sourceCharacter.WarrioirCount, targetCharacter.WarrioirCount) / 100;
            if (damageStep == 0)
                damageStep = 1;

            sourceCharacter.WarrioirCount -= random.Next(4, 6) * damageStep;
            context.Update(sourceCharacter);

            targetCharacter.WarrioirCount -= random.Next(2, 3) * damageStep;
            context.Update(targetCharacter);
        }
    }
}
