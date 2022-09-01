using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
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
    public class CharacterController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<UserController> _logger;

        public CharacterController(ApplicationDbContext context,
            UserManager<User> userManager,
            ILogger<UserController> logger)
        {
            _context = context;
            _userManager = userManager;
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

        [HttpPost]
        [Route("takeСontrol")]
        public async Task<ActionResult<bool>> TakeСontrol(int characterId)
        {
            try
            {
                var currentUser = await _userManager.GetUserAsync(_context, HttpContext.User);
                if (currentUser == null)
                    return NotFound("Не удалось определить текущего пользователя.");

                var character = _context.Characters
                    .Include(c => c.Dynasty)
                    .FirstOrDefault(c => c.UserId == currentUser.Id);
                if (character != null)
                    return NotFound($"Текущим пользователем {currentUser.UserName} " +
                        $"уже взят персонаж {character.Name} {character.Dynasty.Name}.");

                character = _context.Characters
                    .Include(c => c.Dynasty)
                    .Include(c => c.User)
                    .Single(c => c.Id == characterId);

                if (character.UserId != null)
                    return NotFound($"Персонаж {character.Name} {character.Dynasty.Name} " +
                        $"уже взят игроком {character.User.UserName}.");

                character.UserId = currentUser.Id;
                await _context.SaveChangesAsync();
                _logger.LogInformation($"User {currentUser.UserName} took character {character.Name} {character.Dynasty.Name} (id - {character.Id})");

                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }            
        }
    }
}
