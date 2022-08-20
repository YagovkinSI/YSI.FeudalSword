using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.Database.PregenData
{
    public static class PregenTitles
    {
        public static Title[] Get() => new Title[]
        {
            //Ночной дозор
            new Title(1, "Сумеречная башня", 1, 106),
            new Title(2, "Чёрный замок", 1, 106),
            new Title(3, "Восточный дозор", 1, 106),
            new Title(4, "Новый дар", 1, 106),
            
            //Серер
            new Title(5, "Скагос", 2, 107),
            new Title(6, "Кархолд", 2, 107),
            new Title(7, "Последний очаг", 2, 107),
            new Title(8, "Вершина", 2, 107),
            new Title(9, "Каменный холм", 2, 107),

            new Title(10, "Медвежий остров", 3, 108),
            new Title(11, "Мыс морского дракона", 3, 108),
            new Title(12, "Темнолесье", 3, 108),
            new Title(13, "Железный холм", 3, 108),
            new Title(14, "Винтерфелл", 3, 108),
            new Title(15, "Дредфорт", 4, 109),

            new Title(16, "Вдовий дозор", 4, 109),
            new Title(17, "Хорнвуд", 4, 109),
            new Title(18, "Чёрная заводь", 4, 109),
            new Title(19, "Замок Сервинов", 4, 109),
            new Title(20, "Волчий лес", 3, 108),

            new Title(21, "Торхенов удел", 5, 110),
            new Title(22, "Каменный берег", 5, 110),
            new Title(23, "Родники", 5, 110),
            new Title(24, "Барроутон", 5, 110),
            new Title(25, "Белая гавань", 6, 111),

            new Title(26, "Бараньи ворота", 6, 111),
            new Title(27, "Старый замок", 6, 111),
            new Title(28, "Ров Кайлин", 6, 111),
            new Title(29, "Перешеек", 6, 111),
            new Title(30, "Кремневый палец", 5, 110),

            //Железные острова
            new Title(31, "Чёрная волна", 7, 112),
            new Title(32, "Старый Вик", 7, 112),
            new Title(33, "Хаммерхорн", 7, 112),
            new Title(34, "Одинокий светоч", 7, 112),

            new Title(35, "Солёный утёс", 9, 114),
            new Title(36, "Гольцы", 9, 114),
            new Title(37, "Пебблтон", 7, 112),
            new Title(38, "Оркмонт", 8, 113),
            new Title(39, "Десять башен", 8, 113),

            new Title(40, "Камнедрев", 8, 113),
            new Title(41, "Железная роща", 9, 114),
            new Title(42, "Лордпорт", 9, 114),
            new Title(43, "Пайк", 9, 114),
            new Title(44, "Волмарк", 8, 113),

            //Долина
            new Title(45, "Длинная сестра", 10, 115),
            new Title(46, "Милая сестра", 10, 115),
            new Title(47, "Малая сестра", 10, 115),
            new Title(48, "Галечный остров", 10, 115),
            new Title(49, "Сосцы", 10, 115),

            new Title(50, "Персты", 11, 116),
            new Title(51, "Ледяной ручей", 11, 116),
            new Title(52, "Суровая песнь", 11, 116),
            new Title(53, "Змеиный лес", 11, 116),
            new Title(54, "Дом сердец", 12, 117),

            new Title(55, "Длинный лук", 12, 117),
            new Title(56, "Старый якорь", 12, 117),
            new Title(57, "Девять звёзд", 12, 117),
            new Title(58, "Железная дубрава", 12, 117),
            new Title(59, "Орлиное гнездо", 11, 116),
            new Title(60, "Редфорт", 13, 118),

            new Title(61, "Серая лощина", 13, 118),
            new Title(62, "Рунный камень", 12, 117),
            new Title(63, "Ведьмин остров", 13, 118),
            new Title(64, "Чаячий город", 13, 118),
            new Title(65, "Фитили", 13, 118),

            //Речные Земли
            new Title(66, "Близнецы", 14, 119),
            new Title(67, "Сигард", 14, 119),
            new Title(68, "Старые камни", 14, 119),
            new Title(69, "Добрая ярмарка", 14, 119),
            new Title(70, "Вранодрев", 14, 119),

            new Title(71, "Риверран", 15, 120),
            new Title(72, "Каменный оплот", 15, 120),
            new Title(73, "Замок Личестеров", 15, 120),
            new Title(74, "Город Харровея", 15, 120),
            new Title(75, "Дарри", 16, 121),

            new Title(76, "Солеварни", 16, 121),
            new Title(77, "Девичий пруд", 16, 121),
            new Title(78, "Харренхол", 16, 121),
            new Title(79, "Жёлудь", 16, 121),
            new Title(80, "Атранта", 15, 120),

            new Title(81, "Розовая дева", 17, 122),
            new Title(82, "Приют странника", 17, 122),
            new Title(83, "Каслвуд", 17, 122),
            new Title(84, "Каменная септа", 17, 122),

            //Запад
            new Title(85, "Виндхолл", 18, 123),
            new Title(86, "Гибельная крепость", 18, 123),
            new Title(87, "Скала", 18, 123),
            new Title(88, "Кастамере", 18, 123),
            new Title(89, "Золотой зуб", 18, 123),

            new Title(90, "Эшмарк", 19, 124),
            new Title(91, "Тарбекхолл", 19, 124),
            new Title(92, "Светлый остров", 19, 124),
            new Title(93, "Пиршественные огни", 19, 124),
            new Title(94, "Сарсфилд", 19, 124),

            new Title(95, "Хорнваль", 20, 125),
            new Title(96, "Глубокая нора", 20, 125),
            new Title(97, "Ключи", 20, 125),
            new Title(98, "Серебрянный холм", 20, 125),
            new Title(99, "Замок Клиганов", 21, 126),

            new Title(100, "Утёс Кастерли", 21, 126),
            new Title(101, "Ланниспорт", 21, 126),
            new Title(102, "Крейкхолл", 21, 126),
            new Title(103, "Корнфилд", 21, 126),
            new Title(104, "Гринфилд", 21, 126),
            new Title(105, "Золотая дорога", 20, 125),

            //Лорды-знаменосцы
            new Title(106, "Ночной дозор", null, 127, Enums.enTitleRank.Duke, 2),

            new Title(107, "Тюлений залив", null, 127, Enums.enTitleRank.Duke, 6),
            new Title(108, "Винтерфелл", null, 127, Enums.enTitleRank.Duke, 14),
            new Title(109, "Бараньи Лбы", null, 127, Enums.enTitleRank.Duke, 15),
            new Title(110, "Блистающий залив", null, 127, Enums.enTitleRank.Duke, 24),
            new Title(111, "Пасть", null, 127, Enums.enTitleRank.Duke, 25),

            new Title(112, "Острова Вика", null, 128, Enums.enTitleRank.Duke, 37),
            new Title(113, "Остров Харлоу", null, 128, Enums.enTitleRank.Duke, 39),
            new Title(114, "Остров Пайк", null, 128, Enums.enTitleRank.Duke, 43),

            new Title(115, "Три Сестры", null, 129, Enums.enTitleRank.Duke, 46),
            new Title(116, "Лунные горы", null, 129, Enums.enTitleRank.Duke, 59),
            new Title(117, "Доллина", null, 129, Enums.enTitleRank.Duke, 62),
            new Title(118, "Крабий залив", null, 129, Enums.enTitleRank.Duke, 64),

            new Title(119, "Северные зубцы", null, 130, Enums.enTitleRank.Duke, 66),
            new Title(120, "Красный зубец", null, 130, Enums.enTitleRank.Duke, 71),
            new Title(121, "Трезубец", null, 130, Enums.enTitleRank.Duke, 75),
            new Title(122, "Водопад", null, 130, Enums.enTitleRank.Duke, 81),

            new Title(123, "Холмы Пендрика", null, 131, Enums.enTitleRank.Duke, 89),
            new Title(124, "Кайс", null, 131, Enums.enTitleRank.Duke, 93),
            new Title(125, "Западные Холмы", null, 131, Enums.enTitleRank.Duke, 95),
            new Title(126, "Золотой залив", null, 131, Enums.enTitleRank.Duke, 100),

            //Гранд-лорды
            new Title(127, "Север", null, 132, Enums.enTitleRank.King, 14),
            new Title(128, "Железные острова", null, 132, Enums.enTitleRank.King, 43),
            new Title(129, "Доллина Аррен", null, 132, Enums.enTitleRank.King, 59),
            new Title(130, "Речные земли", null, 132, Enums.enTitleRank.King, 71),
            new Title(131, "Запад", null, 132, Enums.enTitleRank.King, 100),
            
            //Короли
            new Title(132, "Семь Королевст", null, null, Enums.enTitleRank.Emperor, 71)
        };
    }
}
