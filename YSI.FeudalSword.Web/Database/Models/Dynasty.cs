using System.Collections.Generic;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class Dynasty
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Character> Characters { get; set; }

        public Dynasty(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
