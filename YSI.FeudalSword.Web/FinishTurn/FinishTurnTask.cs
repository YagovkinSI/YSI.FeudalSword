using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YSI.FeudalSword.Web.Database;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.FinishTurn
{
    public class FinishTurnTask
    {
        private ApplicationDbContext _context;
        private ILogger _logger;
        private int _currentTurnId;

        public FinishTurnTask(ApplicationDbContext context,
            ILogger logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task Execute()
        {
            var currentTurn = await _context.Turns
                .SingleOrDefaultAsync(t => t.Status != Database.Enums.enTurnStatus.IsOver);

            if (currentTurn != null)
            {
                _currentTurnId = currentTurn.Id;

                currentTurn.Status = Database.Enums.enTurnStatus.InCalculation;
                _context.Update(currentTurn);
                _context.SaveChanges();

                CalculationTurn();
                currentTurn.Status = Database.Enums.enTurnStatus.IsOver;
                _context.Update(currentTurn);
            }

            var newTurn = new Turn() { Status = Database.Enums.enTurnStatus.InProgress };
            _context.Add(newTurn);
            _context.SaveChanges();
        }

        private void CalculationTurn()
        {
            
        }
    }
}
