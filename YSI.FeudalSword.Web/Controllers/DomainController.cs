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
    public class DomainController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ArmyController> _logger;

        public DomainController(ApplicationDbContext context,
            ILogger<ArmyController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<PublicDataApiModel>> Get(int domainId)
        {
            try
            {
                var saga = await SagaHelper.GetSaga(_context);

                var domain = await _context.Domains
                    .Include(d => d.Titles)
                    .Include(d => d.ArmiesHere)
                    .SingleAsync(a => a.Id == domainId);
                var publicDataApiModel = new PublicDataApiModel(saga);
                publicDataApiModel.AddDomains(new List<Domain> { domain }, true);
                publicDataApiModel.AddTitles(domain.Titles, false);
                publicDataApiModel.AddArmies(domain.ArmiesHere, false);
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
