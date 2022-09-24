using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using YSI.FeudalSword.Web.ApiModels;
using YSI.FeudalSword.Web.Database;
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
        [Route("getArmiesInDomain")]
        public async Task<ActionResult<PublicDataApiModel>> GetArmiesInDomain(int domainId)
        {
            try
            {
                var saga = await SagaHelper.GetSaga(_context);

                var armies = await _context.Armies
                    .Include(a => a.Units)
                    .Where(a => a.LocationId == domainId)
                    .ToListAsync();
                var publicDataApiModel = new PublicDataApiModel(saga);
                publicDataApiModel.AddArmies(armies);
                publicDataApiModel.AddUnits(armies.SelectMany(a => a.Units));
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
