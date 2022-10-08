using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using YSI.FeudalSword.Web.Database;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.FinishTurn
{
    public class FinishTurnTask
    {
        private ApplicationDbContext _context;
        private ILogger _logger;
        private Turn _currentTurn;

        public FinishTurnTask(ApplicationDbContext context,
            ILogger logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task Execute()
        {
            _currentTurn = await _context.Turns
                .SingleOrDefaultAsync(t => t.Status != Database.Enums.enTurnStatus.TurnIsOver);

            if (_currentTurn != null)
            {
                PreCalculationTurn();
                CalculationTurn();
                PostCalculationTurn();
            }

            var newTurn = new Turn() { Status = Database.Enums.enTurnStatus.InProgress };
            _context.Add(newTurn);
            _context.SaveChanges();
        }

        private void AddWarrioirGatheringCommand(int characterId, ApplicationDbContext _context)
        {
            var command = new Command
            {
                CharacterId = characterId,
                CommandType = Database.Enums.enCommandType.WarrioirGathering,
                CommandTargetId = 0
            };
            _context.Add(command);
        }

        private void PreCalculationTurn()
        {
            if (_currentTurn.Status != Database.Enums.enTurnStatus.InProgress &&
                _currentTurn.Status != Database.Enums.enTurnStatus.InPreCalculation)
                return;

            _currentTurn.Status = Database.Enums.enTurnStatus.InPreCalculation;
            _context.Update(_currentTurn);
            _context.SaveChanges();

            var characters = _context.Characters
                .Include(c => c.Commands)
                .ToList();
            foreach (var character in characters)
            {
                if (character.UserId != null && (character.Commands?.Count ?? 0) == 0)
                {
                    AddWarrioirGatheringCommand(character.Id, _context);
                }
            }
        }

        private void CalculationTurn()
        {
            if (_currentTurn.Status != Database.Enums.enTurnStatus.InPreCalculation &&
                _currentTurn.Status != Database.Enums.enTurnStatus.InCalculation)
                return;

            _currentTurn.Status = Database.Enums.enTurnStatus.InCalculation;
            _context.Update(_currentTurn);
            _context.SaveChanges();

            PhaseAttack.Execute(_context);
            PhaseProgress.Execute(_context);
            PhaseSiege.Execute(_context);
        }

        private void PostCalculationTurn()
        {
            if (_currentTurn.Status != Database.Enums.enTurnStatus.InCalculation &&
                _currentTurn.Status != Database.Enums.enTurnStatus.InPostCalculation)
                return;

            _currentTurn.Status = Database.Enums.enTurnStatus.InPostCalculation;
            _context.Update(_currentTurn);
            _context.SaveChanges();

            var comnamds = _context.Commands
                .ToList();
            foreach (var comnamd in comnamds)
            {
                _context.Remove(comnamd);
            }

            _currentTurn.Status = Database.Enums.enTurnStatus.TurnIsOver;
            _context.Update(_currentTurn);
            _context.SaveChanges();
        }
    }
}
