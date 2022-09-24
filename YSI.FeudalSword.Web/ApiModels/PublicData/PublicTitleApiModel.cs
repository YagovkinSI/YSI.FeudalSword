using System;
using System.Linq;
using YSI.FeudalSword.Web.Database.Enums;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class PublicTitleApiModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public enTitleRank Rank { get; set; }

        public int? OwnerId { get; set; }

        public int CapitalId { get; set; }

        public int? JureSuzerainId { get; set; }
        public int[] JureVassalsIds { get; set; }

        public PublicTitleApiModel(Title databaseItem)
        {
            Id = databaseItem.Id;
            Name = databaseItem.Name;
            Rank = databaseItem.Rank;
            OwnerId = databaseItem.OwnerId;
            CapitalId = databaseItem.CapitalId;
            JureSuzerainId = databaseItem.JureSuzerainId;
            JureVassalsIds = databaseItem.JureVassals?.Select(v => v.Id).ToArray();
        }
    }
}
