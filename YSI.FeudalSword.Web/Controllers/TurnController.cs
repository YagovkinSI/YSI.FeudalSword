using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YSI.FeudalSword.Web.ApiModels;
using YSI.FeudalSword.Web.Database;
using YSI.FeudalSword.Web.FinishTurn;

namespace YSI.FeudalSword.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TurnController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TurnController> _logger;
        private readonly IConfiguration _configuration;

        public TurnController(ApplicationDbContext context,
            ILogger<TurnController> logger,
            IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("getCurrentTurn")]
        public async Task<ActionResult<TurnApiModel>> GetCurrentTurn()
        {
            try
            {
                var currentTurn = await _context.Turns
                    .SingleAsync(t => t.Status != Database.Enums.enTurnStatus.IsOver);
                return new TurnApiModel(currentTurn);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("finishTurn")]
        public async Task<ActionResult<TurnApiModel>> FinishTurn(string id)
        {
            try
            {
                var realCode = _configuration.GetValue<string>("FinishTurnCode");
                if (id != realCode)
                    return NotFound();

                var finishTurnTask = new FinishTurnTask(_context, _logger);
                await finishTurnTask.Execute();

                var currentTurn = await _context.Turns
                    .SingleAsync(t => t.Status != Database.Enums.enTurnStatus.IsOver);
                return new TurnApiModel(currentTurn);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }
    }
}
