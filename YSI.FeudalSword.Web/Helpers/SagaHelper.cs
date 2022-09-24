using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using YSI.FeudalSword.Web.ApiModels;
using YSI.FeudalSword.Web.Database;

namespace YSI.FeudalSword.Web.Helpers
{
    public static class SagaHelper
    {
        public async static Task<SagaApiModel> GetSaga(ApplicationDbContext context)
        {
            var currentTurn = await context.Turns
                    .SingleAsync(t => t.Status != Database.Enums.enTurnStatus.IsOver);
            var saga = new SagaApiModel
            {
                GameVersion = "000.000.001",
                ServerDateTime = DateTime.Now,
                TurnNumber = currentTurn.Id
            };
            return saga;
        }
    }
}
