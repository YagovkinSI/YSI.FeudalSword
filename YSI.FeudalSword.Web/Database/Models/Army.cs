using System.Collections.Generic;
using YSI.FeudalSword.Web.Database.Enums;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class Army
    {
        public int Id { get; set; }
        public int CommanderId { get; set; }
        public int LocationId { get; set; }
        public enArmyMission Mission { get; set; }
        public int MissionTargetId { get; set; }
        public int DayOfTurn { get; set; }
        public enArmyAction Action { get; set; }
        public int ActionTargetId { get; set; }
        public int ActionProgress { get; set; }

        public List<Unit> Units { get; set; }
        public Character Commander { get; set; }
        public Domain Location { get; set; }
    }
}
