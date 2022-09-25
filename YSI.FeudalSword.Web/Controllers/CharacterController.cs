using Microsoft.AspNetCore.Identity;
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
    public class CharacterController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<CharacterController> _logger;

        public CharacterController(ApplicationDbContext context,
            UserManager<User> userManager,
            ILogger<CharacterController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<PublicDataApiModel>> Get(int characterId)
        {
            try
            {
                var saga = await SagaHelper.GetSaga(_context);

                var character = await _context.Characters
                    .Include(c => c.Dynasty)
                    .Include(c => c.User)
                    .Include(c => c.Titles)
                    .SingleAsync(a => a.Id == characterId);
                var publicDataApiModel = new PublicDataApiModel(saga);
                publicDataApiModel.AddCharacters(new List<Character> { character }, 
                    false, true, false, false);
                publicDataApiModel.AddDynasties(new List<Dynasty> { character.Dynasty }, false);
                publicDataApiModel.AddUsers(new List<User> { character.User }, false);
                publicDataApiModel.AddTitles(character.Titles, false);
                return Ok(publicDataApiModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getMyCharacter")]
        public async Task<ActionResult<CheckMyCharacter>> GetMyCharacter()
        {
            try
            {
                var currentUser = await _userManager.GetUserAsync(_context, HttpContext.User);
                if (currentUser == null)
                    return NotFound("Не удалось определить текущего пользователя.");

                var character = _context.Characters
                    .Include(c => c.Dynasty)
                    .Include(c => c.User)
                    .Include(c => c.Titles)
                    .FirstOrDefault(c => c.UserId == currentUser.Id);

                return new CheckMyCharacter(character);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        [Route("takeControl")]
        public async Task<ActionResult<bool>> TakeControl(int characterId)
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
                    .Include(c => c.Titles)
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
