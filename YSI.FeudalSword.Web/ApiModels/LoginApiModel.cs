using System.ComponentModel.DataAnnotations;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class LoginApiModel
    {
        [Required(ErrorMessage = "Требуется логин")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Требуется пароль")]
        public string Password { get; set; }
    }
}
