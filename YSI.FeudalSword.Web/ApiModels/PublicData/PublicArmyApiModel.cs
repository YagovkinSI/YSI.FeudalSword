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

        public PublicArmyApiModel(Army databaseItem, bool withUnits)
        {
            Id = databaseItem.Id;
            CommanderId = databaseItem.CommanderId;
            LocationId = databaseItem.LocationId;
            UnitIds = withUnits
                ? databaseItem.Units?.Select(u => u.Id).ToArray()
                : null;
        }
    }
}
