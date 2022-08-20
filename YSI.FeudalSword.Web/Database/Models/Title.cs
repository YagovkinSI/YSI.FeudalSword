using System.Collections.Generic;
using YSI.FeudalSword.Web.Database.Enums;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class Title
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public enTitleRank Rank { get; set; }

        public int? OwnerId { get; set; }
        public Character Owner { get; set; }

        public int CapitalId { get; set; }
        public Domain Capital { get; set; }

        public int? JureSuzerainId { get; set; }
        public Title JureSuzerain { get; set; }
        public List<Title> JureVassals { get; set; }

        public Title(int id, string name, int? ownerId, int? jureSuzerainId)
            : this(id, name, ownerId, jureSuzerainId, enTitleRank.Earl, id)
        { }

        public Title(int id, string name, int? ownerId, 
            int? jureSuzerainId, enTitleRank rank, int capitalId)
        {
            Id = id;
            Name = name;
            OwnerId = ownerId;
            Rank = rank;
            CapitalId = capitalId;
            JureSuzerainId = jureSuzerainId;
        }
    }
}
