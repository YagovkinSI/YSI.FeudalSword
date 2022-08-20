using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace YSI.FeudalSword.Web.Database.Models
{
    public class User : IdentityUser
    {
        public DateTime Created { get; set; }
        public DateTime LastActivity { get; set; }

        public List<Character> Characters { get; set; }
    }
}
