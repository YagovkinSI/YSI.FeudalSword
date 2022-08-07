using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using YSI.FeudalSword.Web.Database;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.Helpers
{
    public static class UserHelper
    {
        internal static async Task SignInAsync(this SignInManager<User> signInManager,
            ApplicationDbContext context, User user, bool isPersistent)
        {
            await signInManager.SignInAsync(user, isPersistent);
            await UpdateLastActivity(context, user);
        }

        internal static async Task<User> PasswordSignInAsync(this SignInManager<User> signInManager,
            ApplicationDbContext context, string userName, string password, 
            bool isPersistent = true, bool lockoutOnFailure = false)
        {
            var result =
                await signInManager.PasswordSignInAsync(userName, password, isPersistent, lockoutOnFailure);
            if (!result.Succeeded)
                return null;

            var user = await context.Users.SingleAsync(u => u.UserName == userName);
            await UpdateLastActivity(context, user);
            return user;
        }

        internal static async Task<User> GetUserAsync(this UserManager<User> userManager,
            ApplicationDbContext context, ClaimsPrincipal claimsPrincipal)
        {
            var user = await userManager.GetUserAsync(claimsPrincipal);
            if (user == null)
                throw new Exception("Пользователь не авторизован");

            await UpdateLastActivity(context, user);
            return user;
        }

        private static async Task UpdateLastActivity(ApplicationDbContext context, User user)
        {
            if (user.LastActivity + new TimeSpan(0, 0, 30) < DateTime.UtcNow)
            {
                user.LastActivity = DateTime.UtcNow;
                context.Update(user);
                await context.SaveChangesAsync();
            }
        }
    }
}
