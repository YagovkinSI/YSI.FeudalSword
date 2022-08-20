using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using YSI.FeudalSword.Web.ApiModels;
using YSI.FeudalSword.Web.Database;

namespace YSI.FeudalSword.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CharacterController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserController> _logger;

        public CharacterController(ApplicationDbContext context,
            ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [Route("getByTitle")]
        public async Task<ActionResult<CharacterApiModel>> GetByTitle(int titleId)
        {
            try
            {
                var title = await _context.Titles.FindAsync(titleId);
                if (title == null)
                    return NotFound($"Титул с id={titleId} не найден в БД.");

                if (title.OwnerId == null)
                    return NotFound($"Титулом {title.Name} ({title.Rank}) никто не владеет.");

                var character = await _context.Characters
                    .Include(c => c.Dynasty)
                    .Include(c => c.User)
                    .Include(c => c.Titles)
                    .SingleAsync(c => c.Id == title.OwnerId);
                if (character == null)
                    return NotFound($"Персонаж с id={title.OwnerId} не найден в БД.");

                var characterApiModel = new CharacterApiModel(character);
                return Ok(characterApiModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }
    }
}
