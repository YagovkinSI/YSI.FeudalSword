using System;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class CurrentUserApiModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActivity { get; set; }
        public bool LockoutEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Email { get; set; }

        public CurrentUserApiModel(User user)
        {
            Id = user.Id;
            UserName = user.UserName;
            Created = user.Created;
            LastActivity = user.LastActivity;
            LockoutEnabled = user.LockoutEnabled;
            LockoutEnd = user.LockoutEnd;
            TwoFactorEnabled = user.TwoFactorEnabled;
            PhoneNumberConfirmed = user.PhoneNumberConfirmed;
            PhoneNumber = user.PhoneNumber;
            EmailConfirmed = user.EmailConfirmed;
            Email = user.Email;
        }
    }
}
