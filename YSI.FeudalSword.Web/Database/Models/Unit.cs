using YSI.FeudalSword.Web.Database.Enums;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class Unit
    {
        public int Id { get; set; }
        public enUnitType Type { get; set; }
        public int Count { get; set; }
        public int Training { get; set; }
        public int ArmyId { get; set; }
        public int OwnerId { get; set; }
        public int HomelandId { get; set; }

        public Army Army { get; set; }
        public Character Owner { get; set; }
        public Domain Homeland { get; set; }
    }
}
