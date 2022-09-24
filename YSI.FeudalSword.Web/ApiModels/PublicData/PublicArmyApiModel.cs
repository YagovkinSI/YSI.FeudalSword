using System;
using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class PublicArmyApiModel
    {
        public int Id { get; set; }
        public int CommanderId { get; set; }
        public int LocationId { get; set; }

        public int[] UnitIds { get; set; }

        public PublicArmyApiModel(Army army)
        {
            Id = army.Id;
            CommanderId = army.CommanderId;
            LocationId = army.LocationId;
            UnitIds = army.Units?.Select(u => u.Id).ToArray();
        }
    }
}
