using System.Collections.Generic;
using YSI.FeudalSword.Web.Database.Enums;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class TitleShortApiModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public enTitleRank Rank { get; set; }
        public int? OwnerId { get; set; }
        public int CapitalId { get; set; }
        public int? JureSuzerainId { get; set; }

        public TitleShortApiModel(Title title)
        {
            Id = title.Id;
            Name = title.Name;
            Rank = title.Rank;
            OwnerId = title.OwnerId;
            CapitalId = title.CapitalId;
            JureSuzerainId = title.JureSuzerainId;
        }
    }
}
