using Microsoft.AspNetCore.Identity;
using System;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class User : IdentityUser
    {
        public DateTime Created { get; set; }
        public DateTime LastActivity { get; set; }
    }
}
