using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.Database.PregenData
{
    public static class PregenUnits
    {
        public static Unit[] Get()
        {
            var titles = PregenTitles.Get();
            var units = new Unit[105 * 6];
            for (var i = 0; i < 105; i++)
            {
                var commoners = new Unit
                {
                    Id = i * 6 + 1,
                    Type = Enums.enUnitType.Commoners,
                    Count = 950,
                    Training = 0,
                    ArmyId = i * 2 + 1,
                    OwnerId = titles.Single(t => t.Id == i + 1).OwnerId.Value,
                    HomelandId = i + 1
                };
                units[i * 6] = commoners;

                var swordsman = new Unit
                {
                    Id = i * 6 + 2,
                    Type = Enums.enUnitType.Swordsman,
                    Count = 20,
                    Training = 50,
                    ArmyId = i * 2 + 2,
                    OwnerId = titles.Single(t => t.Id == i + 1).OwnerId.Value,
                    HomelandId = i + 1
                };
                units[i * 6 + 1] = swordsman;

                var archers = new Unit
                {
                    Id = i * 6 + 3,
                    Type = Enums.enUnitType.Archer,
                    Count = 10,
                    Training = 50,
                    ArmyId = i * 2 + 2,
                    OwnerId = titles.Single(t => t.Id == i + 1).OwnerId.Value,
                    HomelandId = i + 1
                };
                units[i * 6 + 2] = archers;

                var pikeman = new Unit
                {
                    Id = i * 6 + 4,
                    Type = Enums.enUnitType.Pikeman,
                    Count = 10,
                    Training = 50,
                    ArmyId = i * 2 + 2,
                    OwnerId = titles.Single(t => t.Id == i + 1).OwnerId.Value,
                    HomelandId = i + 1
                };
                units[i * 6 + 3] = pikeman;

                var rider = new Unit
                {
                    Id = i * 6 + 5,
                    Type = Enums.enUnitType.Rider,
                    Count = 10,
                    Training = 50,
                    ArmyId = i * 2 + 2,
                    OwnerId = titles.Single(t => t.Id == i + 1).OwnerId.Value,
                    HomelandId = i + 1
                };
                units[i * 6 + 4] = rider;

                var elite = new Unit
                {
                    Id = i * 6 + 6,
                    Type = Enums.enUnitType.EliteWarrior,
                    Count = 2,
                    Training = 50,
                    ArmyId = i * 2 + 2,
                    OwnerId = titles.Single(t => t.Id == i + 1).OwnerId.Value,
                    HomelandId = i + 1
                };
                units[i * 6 + 5] = elite;
            }
            return units;
        }
    }
}
