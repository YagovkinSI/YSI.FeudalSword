using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class CheckAuthResponse
    {
        public CurrentUserApiModel User { get; set; }
        public bool IsAuthorized { get; set; }

        public CheckAuthResponse(User user)
        {
            if (user != null)
            {
                User = new CurrentUserApiModel(user);
                IsAuthorized = true;
            }
        }
    }
}
