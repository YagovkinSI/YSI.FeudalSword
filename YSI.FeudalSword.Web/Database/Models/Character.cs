using System.Collections.Generic;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class Character
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? DynastyId { get; set; }
        public Dynasty Dynasty { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public int? SuzerainId { get; set; }
        public Character Suzerain { get; set; }
        public List<Character> Vassals { get; set; }

        public List<Title> Titles { get; set; }
        public List<Unit> Units { get; set; }
        public List<Army> Armies { get; set; }

        public Character(int id, string name, int? dynastyId = null, int ? suzerainId = null)
        {
            Id = id;
            Name = name;
            DynastyId = dynastyId ?? id;
            SuzerainId = suzerainId;
        }
    }
}
