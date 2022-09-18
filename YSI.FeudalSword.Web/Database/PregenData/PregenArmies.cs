using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.Database.PregenData
{
    public static class PregenArmies
    {
        public static Army[] Get()
        {
            var titles = PregenTitles.Get();
            var armies = new Army[105 * 2];
            for (var i = 0; i < 105; i++)
            {
                var commoners = new Army 
                { 
                    Id = i * 2 + 1,
                    CommanderId = titles.Single(t => t.Id == i + 1).OwnerId.Value,
                    LocationId = i + 1,
                    Mission = Enums.enArmyMission.Working,
                    MissionTargetId = i + 1,
                    DayOfTurn = 0,
                    Action = Enums.enArmyAction.Working,
                    ActionTargetId = i + 1,
                    ActionProgress = 0                    
                };
                armies[i * 2] = commoners;

                var controllers = new Army
                {
                    Id = i * 2 + 2,
                    CommanderId = titles.Single(t => t.Id == i + 1).OwnerId.Value,
                    LocationId = i + 1,
                    Mission = Enums.enArmyMission.Control,
                    MissionTargetId = i + 1,
                    DayOfTurn = 0,
                    Action = Enums.enArmyAction.Control,
                    ActionTargetId = i + 1,
                    ActionProgress = 0
                };
                armies[i * 2 + 1] = controllers;
            }
            return armies;
        }
    }
}
