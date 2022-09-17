using YSI.FeudalSword.Web.Database.Enums;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class TurnApiModel
    {
        public int Id { get; set; }
        public enTurnStatus Status { get; set; }

        public TurnApiModel(Turn turn)
        {
            Id = turn.Id;
            Status = turn.Status;
        }
    }
}
