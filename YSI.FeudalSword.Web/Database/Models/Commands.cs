using System.Collections.Generic;
using YSI.FeudalSword.Web.Database.Enums;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class Command
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public enCommandType CommandType { get; set; }
        public int CommandTargetId { get; set; }

        public Character Character { get; set; }
    }
}
