using System;
using System.Linq;
using YSI.FeudalSword.Web.Database.Enums;
using YSI.FeudalSword.Web.Database.Models;
using YSI.FeudalSword.Web.Helpers;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class PublicUnitApiModel
    {
        public int Id { get; set; }
        public enUnitType Type { get; set; }
        public int CountAbout { get; set; }
        public int ArmyId { get; set; }
        public int OwnerId { get; set; }

        public PublicUnitApiModel(Unit unit)
        {
            Id = unit.Id;
            Type = unit.Type;
            CountAbout = CountHelper.Round(unit.Count);
            ArmyId = unit.ArmyId;
            OwnerId = unit.OwnerId;
        }
    }
}
