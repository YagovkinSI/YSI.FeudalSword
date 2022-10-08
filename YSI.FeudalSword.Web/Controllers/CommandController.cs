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
using YSI.FeudalSword.Web.Database.Enums;
using YSI.FeudalSword.Web.Database.Models;
using YSI.FeudalSword.Web.Helpers;

namespace YSI.FeudalSword.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommandController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<ArmyController> _logger;

        public CommandController(ApplicationDbContext context,
            UserManager<User> userManager,
            ILogger<ArmyController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet]
        [Route("set")]
        public async Task<ActionResult<bool>> Set(enCommandType commandType, int? commandTargetId)
        {
            try
            {
                var currentUser = await _userManager.GetUserAsync(_context, HttpContext.User);
                if (currentUser == null)
                    return NotFound("Не удалось определить текущего пользователя.");

                var character = _context.Characters
                    .Include(c => c.Dynasty)
                    .FirstOrDefault(c => c.UserId == currentUser.Id);
                if (character == null)
                    return NotFound($"У текущего пользователя {currentUser.UserName} " +
                        $"нет персонажа.");

                var command = _context.Commands
                    .SingleOrDefault(c => c.CharacterId == character.Id);
                if (command != null)
                {
                    command.CommandType = commandType;
                    command.CommandTargetId = commandTargetId ?? -1;
                    _context.Update(command);
                }
                else
                {
                    command = new Command
                    {
                        CharacterId = character.Id,
                        CommandType = commandType,
                        CommandTargetId = commandTargetId ?? -1,
                    };
                    _context.Add(command);
                }

                await _context.SaveChangesAsync();
                _logger.LogInformation($"Пользователь {currentUser.UserName} выбрал комманду " +
                    $"{commandType} с целью {commandTargetId?.ToString() ?? "NULL"}");

                return true;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getMyCommands")]
        public async Task<ActionResult<CheckMyCommands>> GetMyCommands()
        {
            try
            {
                var currentUser = await _userManager.GetUserAsync(_context, HttpContext.User);
                if (currentUser == null)
                    return NotFound("Не удалось определить текущего пользователя.");

                var character = _context.Characters
                    .Include(c => c.Commands)
                    .FirstOrDefault(c => c.UserId == currentUser.Id);

                return new CheckMyCommands(character.Commands);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}
