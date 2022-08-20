using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.Database.PregenData
{
    public static class PregenCharacters
    {
        public static Character[] Get() => new Character[]
        {
            new Character(1, "Джиор"),

            new Character(2, "Рикард"),
            new Character(3, "Эддард"),
            new Character(4, "Русе"),
            new Character(5, "Виллам"),
            new Character(6, "Виман"),

            new Character(7, "Мелдред"),
            new Character(8, "Родрик"),
            new Character(9, "Бейлон"),

            new Character(10, "Тристон"),
            new Character(11, "Роберт"),
            new Character(12, "Джон"),
            new Character(13, "Герольд"),

            new Character(14, "Уолдер"),
            new Character(15, "Хостер"),
            new Character(16, "Реймен"),
            new Character(17, "Клемент"),

            new Character(18, "Лео"),
            new Character(19, "Терренс"),
            new Character(20, "Андрос"),
            new Character(21, "Тайвин")
        };
    }
}
