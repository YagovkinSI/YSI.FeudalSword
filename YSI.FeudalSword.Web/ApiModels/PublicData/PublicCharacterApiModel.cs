using System;
using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class PublicCharacterApiModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? DynastyId { get; set; }

        public string UserId { get; set; }

        public int? SuzerainId { get; set; }
        public int[] VassalsIds { get; set; }

        public int[] TitlesIds { get; set; }
        public int[] UnitsIds { get; set; }
        public int[] ArmiesIds { get; set; }

        public PublicCharacterApiModel(Character databaseItem, 
            bool withVassals, bool withTitles, bool withUnits, bool withArmies)
        {
            Id = databaseItem.Id;
            Name = databaseItem.Name;
            DynastyId = databaseItem.DynastyId;
            UserId = databaseItem.UserId;
            SuzerainId = databaseItem.SuzerainId;
            VassalsIds = withVassals
                ? databaseItem.Vassals?.Select(v => v.Id).ToArray()
                : null;
            TitlesIds = withTitles
                ? databaseItem.Titles?.Select(s => s.Id).ToArray()
                : null;
            UnitsIds = withUnits
                ? databaseItem.Units?.Select(u => u.Id).ToArray()
                : null;
            ArmiesIds = withArmies
                ? databaseItem.Armies?.Select(u => u.Id).ToArray()
                : null;
        }
    }
}
