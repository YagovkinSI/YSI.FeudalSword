using System.Collections.Generic;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class Domain
    {
        public int Id { get; set; }

        public List<Title> Titles { get; set; }

        public List<Unit> UnitsFromHere { get; set; }

        public List<Army> ArmiesHere { get; set; }
    }
}
