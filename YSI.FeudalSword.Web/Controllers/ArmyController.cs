using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YSI.FeudalSword.Web.ApiModels;
using YSI.FeudalSword.Web.Database;
using YSI.FeudalSword.Web.Database.Models;
using YSI.FeudalSword.Web.Helpers;

namespace YSI.FeudalSword.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArmyController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ArmyController> _logger;

        public ArmyController(ApplicationDbContext context,
            ILogger<ArmyController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<PublicDataApiModel>> get(int armyId)
        {
            try
            {
                var saga = await SagaHelper.GetSaga(_context);

                var army = await _context.Armies
                    .Include(a => a.Units)
                    .Include(a => a.Commander)
                    .Include(a => a.Location)
                    .SingleAsync(a => a.Id == armyId);
                var publicDataApiModel = new PublicDataApiModel(saga);
                publicDataApiModel.AddArmies(new List<Army> { army }, true);
                publicDataApiModel.AddUnits(army.Units);
                publicDataApiModel.AddCharacters(new List<Character> { army.Commander }, 
                    false, false, false, false);
                publicDataApiModel.AddDomains(new List<Domain> { army.Location }, false);
                return Ok(publicDataApiModel);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }
    }
}
