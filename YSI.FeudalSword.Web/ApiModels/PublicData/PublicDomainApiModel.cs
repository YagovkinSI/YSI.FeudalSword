using System;
using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class PublicDomainApiModel
    {
        public int Id { get; set; }
        public int[] TitlesIds { get; set; }
        public int[] ArmiesHereIds { get; set; }

        public PublicDomainApiModel(Domain databaseItem, bool withArmiesHere)
        {
            Id = databaseItem.Id;
            TitlesIds = databaseItem.Titles?.Select(t => t.Id).ToArray();
            ArmiesHereIds = withArmiesHere
                ? databaseItem.ArmiesHere?.Select(t => t.Id).ToArray()
                : null;
        }
    }
}
