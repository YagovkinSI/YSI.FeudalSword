using System;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class PubliUserApiModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActivity { get; set; }

        public int[] CharacterIds { get; set; }
    }
}
