using YSI.FeudalSword.Web.Database.Enums;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class Turn
    {
        public int Id { get; set; }
        public enTurnStatus Status { get; set; }
    }
}
