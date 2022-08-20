using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.Database.PregenData
{
    public static class PregenDynasties
    {
        public static Dynasty[] Get() => new Dynasty[]
        {
            new Dynasty(1, "Мормонт"),

            new Dynasty(2, "Карстарк"),
            new Dynasty(3, "Старк"),
            new Dynasty(4, "Болтон"),
            new Dynasty(5, "Дастин"),
            new Dynasty(6, "Мандерли"),

            new Dynasty(7, "Мерлин"),
            new Dynasty(8, "Харлоу"),
            new Dynasty(9, "Грейджой"),

            new Dynasty(10, "Сандерленд"),
            new Dynasty(11, "Аррен"),
            new Dynasty(12, "Ройс"),
            new Dynasty(13, "Графтон"),

            new Dynasty(14, "Фрей"),
            new Dynasty(15, "Талли"),
            new Dynasty(16, "Дарри"),
            new Dynasty(17, "Пайпер"),

            new Dynasty(18, "Леффорд"),
            new Dynasty(19, "Кеннинг"),
            new Dynasty(20, "Бракс"),
            new Dynasty(21, "Ланнистер")
        };
    }
}
