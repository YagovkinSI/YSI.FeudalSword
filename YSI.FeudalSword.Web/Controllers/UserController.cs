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
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger<UserController> _logger;

        public UserController(ApplicationDbContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            ILogger<UserController> logger)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<CurrentUserApiModel>> Register(RegisterApiModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = CreateNewUser(model.UserName);
                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (!result.Succeeded)
                        return BadRequest(string.Join(". ", result.Errors.Select(e => e.Description)));

                    _logger.LogInformation($"Created user: id - {user.Id}, userName - {user.UserName}");
                    await _signInManager.SignInAsync(_context, user, true);
                    return new CurrentUserApiModel(user);
                }

                var stateErrors = ModelState.SelectMany(s => s.Value.Errors.Select(e => e.ErrorMessage));
                return BadRequest(string.Join(". ", stateErrors));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private User CreateNewUser(string userName)
        {
            return new User
            {
                Email = string.Empty,
                UserName = userName,
                Created = DateTime.UtcNow,
                LastActivity = DateTime.MinValue
            };
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<CurrentUserApiModel>> Login(LoginApiModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user =
                        await _signInManager.PasswordSignInAsync(
                            _context, model.UserName, model.Password, true, false);
                    if (user == null)
                        return BadRequest("Неправильный логин и(или) пароль");

                    _logger.LogInformation($"Logined user: id - {user.Id}, userName - {user.UserName}");
                    return new CurrentUserApiModel(user);
                }

                var stateErrors = ModelState.SelectMany(s => s.Value.Errors.Select(e => e.ErrorMessage));
                return BadRequest(string.Join(". ", stateErrors));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("logout")]
        public async Task<ActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("currentUser")]
        public async Task<ActionResult<CheckAuthResponse>> GetCurrentUser()
        {
            try
            {
                throw new Exception("Текстовая ошибка");

                var user = await _userManager.GetUserAsync(_context, HttpContext.User);
                if (user == null)
                    return new CheckAuthResponse(null);

                _logger.LogInformation($"Got current user: user: id - {user.Id}, userName - {user.UserName}");
                return new CheckAuthResponse(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}
