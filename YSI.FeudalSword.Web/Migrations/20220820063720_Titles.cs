using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace YSI.FeudalSword.Web.Migrations
{
    public partial class Titles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastActivity = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Domains",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Domains", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dynasties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dynasties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Characters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DynastyId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SuzerainId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Characters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Characters_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Characters_Characters_SuzerainId",
                        column: x => x.SuzerainId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Characters_Dynasties_DynastyId",
                        column: x => x.DynastyId,
                        principalTable: "Dynasties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Titles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rank = table.Column<int>(type: "int", nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: true),
                    CapitalId = table.Column<int>(type: "int", nullable: false),
                    JureSuzerainId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Titles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Titles_Characters_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Titles_Domains_CapitalId",
                        column: x => x.CapitalId,
                        principalTable: "Domains",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Titles_Titles_JureSuzerainId",
                        column: x => x.JureSuzerainId,
                        principalTable: "Titles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Domains",
                column: "Id",
                values: new object[]
                {
                    1,
                    78,
                    77,
                    76,
                    75,
                    74,
                    73,
                    72,
                    71,
                    70,
                    69,
                    79,
                    68,
                    66,
                    65,
                    64,
                    62,
                    61,
                    60,
                    59,
                    58,
                    57,
                    56,
                    67,
                    80,
                    81,
                    82,
                    105,
                    104,
                    103,
                    102,
                    101,
                    100,
                    99,
                    98,
                    97,
                    96,
                    95,
                    94,
                    93,
                    92,
                    91
                });

            migrationBuilder.InsertData(
                table: "Domains",
                column: "Id",
                values: new object[]
                {
                    90,
                    89,
                    88,
                    87,
                    86,
                    85,
                    84,
                    83,
                    55,
                    54,
                    63,
                    52,
                    24,
                    23,
                    22,
                    21,
                    20,
                    19,
                    18,
                    53,
                    16,
                    15,
                    14,
                    13,
                    12,
                    11,
                    10,
                    9,
                    8,
                    7,
                    6,
                    5,
                    4,
                    3,
                    2,
                    25,
                    26,
                    17,
                    28,
                    51,
                    50,
                    27
                });

            migrationBuilder.InsertData(
                table: "Domains",
                column: "Id",
                values: new object[]
                {
                    48,
                    47,
                    46,
                    45,
                    44,
                    43,
                    42,
                    41,
                    49,
                    39,
                    40,
                    29,
                    31,
                    32,
                    33,
                    30,
                    35,
                    36,
                    37,
                    38,
                    34
                });

            migrationBuilder.InsertData(
                table: "Dynasties",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 19, "Кеннинг" },
                    { 12, "Ройс" },
                    { 18, "Леффорд" },
                    { 17, "Пайпер" },
                    { 16, "Дарри" },
                    { 15, "Талли" },
                    { 14, "Фрей" },
                    { 13, "Графтон" },
                    { 11, "Аррен" },
                    { 5, "Дастин" },
                    { 9, "Грейджой" },
                    { 8, "Харлоу" },
                    { 7, "Мерлин" },
                    { 6, "Мандерли" },
                    { 4, "Болтон" },
                    { 3, "Старк" },
                    { 2, "Карстарк" },
                    { 1, "Мормонт" },
                    { 20, "Бракс" },
                    { 10, "Сандерленд" },
                    { 21, "Ланнистер" }
                });

            migrationBuilder.InsertData(
                table: "Characters",
                columns: new[] { "Id", "DynastyId", "Name", "SuzerainId", "UserId" },
                values: new object[,]
                {
                    { 10, 10, "Тристон", null, null },
                    { 19, 19, "Терренс", null, null },
                    { 18, 18, "Лео", null, null },
                    { 17, 17, "Клемент", null, null },
                    { 16, 16, "Реймен", null, null },
                    { 15, 15, "Хостер", null, null },
                    { 14, 14, "Уолдер", null, null },
                    { 13, 13, "Герольд", null, null },
                    { 12, 12, "Джон", null, null },
                    { 11, 11, "Роберт", null, null },
                    { 21, 21, "Тайвин", null, null },
                    { 9, 9, "Бейлон", null, null },
                    { 8, 8, "Родрик", null, null },
                    { 7, 7, "Мелдред", null, null },
                    { 6, 6, "Виман", null, null },
                    { 5, 5, "Виллам", null, null },
                    { 4, 4, "Русе", null, null },
                    { 3, 3, "Эддард", null, null },
                    { 2, 2, "Рикард", null, null },
                    { 1, 1, "Джиор", null, null },
                    { 20, 20, "Андрос", null, null }
                });

            migrationBuilder.InsertData(
                table: "Titles",
                columns: new[] { "Id", "CapitalId", "JureSuzerainId", "Name", "OwnerId", "Rank" },
                values: new object[] { 132, 71, null, "Семь Королевст", null, 4 });

            migrationBuilder.InsertData(
                table: "Titles",
                columns: new[] { "Id", "CapitalId", "JureSuzerainId", "Name", "OwnerId", "Rank" },
                values: new object[,]
                {
                    { 127, 14, 132, "Север", null, 3 },
                    { 128, 43, 132, "Железные острова", null, 3 },
                    { 129, 59, 132, "Доллина Аррен", null, 3 },
                    { 130, 71, 132, "Речные земли", null, 3 },
                    { 131, 100, 132, "Запад", null, 3 }
                });

            migrationBuilder.InsertData(
                table: "Titles",
                columns: new[] { "Id", "CapitalId", "JureSuzerainId", "Name", "OwnerId", "Rank" },
                values: new object[,]
                {
                    { 106, 2, 127, "Ночной дозор", null, 2 },
                    { 124, 93, 131, "Кайс", null, 2 },
                    { 123, 89, 131, "Холмы Пендрика", null, 2 },
                    { 122, 81, 130, "Водопад", null, 2 },
                    { 121, 75, 130, "Трезубец", null, 2 },
                    { 120, 71, 130, "Красный зубец", null, 2 },
                    { 119, 66, 130, "Северные зубцы", null, 2 },
                    { 118, 64, 129, "Крабий залив", null, 2 },
                    { 117, 62, 129, "Доллина", null, 2 },
                    { 125, 95, 131, "Западные Холмы", null, 2 },
                    { 116, 59, 129, "Лунные горы", null, 2 },
                    { 114, 43, 128, "Остров Пайк", null, 2 },
                    { 113, 39, 128, "Остров Харлоу", null, 2 },
                    { 112, 37, 128, "Острова Вика", null, 2 },
                    { 111, 25, 127, "Пасть", null, 2 },
                    { 110, 24, 127, "Блистающий залив", null, 2 },
                    { 109, 15, 127, "Бараньи Лбы", null, 2 },
                    { 108, 14, 127, "Винтерфелл", null, 2 },
                    { 107, 6, 127, "Тюлений залив", null, 2 },
                    { 115, 46, 129, "Три Сестры", null, 2 },
                    { 126, 100, 131, "Золотой залив", null, 2 }
                });

            migrationBuilder.InsertData(
                table: "Titles",
                columns: new[] { "Id", "CapitalId", "JureSuzerainId", "Name", "OwnerId", "Rank" },
                values: new object[,]
                {
                    { 1, 1, 106, "Сумеречная башня", 1, 1 },
                    { 75, 75, 121, "Дарри", 16, 1 },
                    { 80, 80, 120, "Атранта", 15, 1 },
                    { 74, 74, 120, "Город Харровея", 15, 1 },
                    { 73, 73, 120, "Замок Личестеров", 15, 1 },
                    { 72, 72, 120, "Каменный оплот", 15, 1 },
                    { 71, 71, 120, "Риверран", 15, 1 },
                    { 70, 70, 119, "Вранодрев", 14, 1 },
                    { 69, 69, 119, "Добрая ярмарка", 14, 1 },
                    { 68, 68, 119, "Старые камни", 14, 1 },
                    { 67, 67, 119, "Сигард", 14, 1 },
                    { 76, 76, 121, "Солеварни", 16, 1 },
                    { 66, 66, 119, "Близнецы", 14, 1 },
                    { 64, 64, 118, "Чаячий город", 13, 1 },
                    { 63, 63, 118, "Ведьмин остров", 13, 1 },
                    { 61, 61, 118, "Серая лощина", 13, 1 },
                    { 60, 60, 118, "Редфорт", 13, 1 },
                    { 62, 62, 117, "Рунный камень", 12, 1 },
                    { 58, 58, 117, "Железная дубрава", 12, 1 },
                    { 57, 57, 117, "Девять звёзд", 12, 1 },
                    { 56, 56, 117, "Старый якорь", 12, 1 },
                    { 55, 55, 117, "Длинный лук", 12, 1 },
                    { 54, 54, 117, "Дом сердец", 12, 1 },
                    { 65, 65, 118, "Фитили", 13, 1 },
                    { 77, 77, 121, "Девичий пруд", 16, 1 },
                    { 78, 78, 121, "Харренхол", 16, 1 },
                    { 79, 79, 121, "Жёлудь", 16, 1 },
                    { 102, 102, 126, "Крейкхолл", 21, 1 },
                    { 101, 101, 126, "Ланниспорт", 21, 1 },
                    { 100, 100, 126, "Утёс Кастерли", 21, 1 },
                    { 99, 99, 126, "Замок Клиганов", 21, 1 },
                    { 105, 105, 125, "Золотая дорога", 20, 1 },
                    { 98, 98, 125, "Серебрянный холм", 20, 1 },
                    { 97, 97, 125, "Ключи", 20, 1 },
                    { 96, 96, 125, "Глубокая нора", 20, 1 },
                    { 95, 95, 125, "Хорнваль", 20, 1 },
                    { 94, 94, 124, "Сарсфилд", 19, 1 },
                    { 93, 93, 124, "Пиршественные огни", 19, 1 },
                    { 92, 92, 124, "Светлый остров", 19, 1 },
                    { 91, 91, 124, "Тарбекхолл", 19, 1 },
                    { 90, 90, 124, "Эшмарк", 19, 1 },
                    { 89, 89, 123, "Золотой зуб", 18, 1 }
                });

            migrationBuilder.InsertData(
                table: "Titles",
                columns: new[] { "Id", "CapitalId", "JureSuzerainId", "Name", "OwnerId", "Rank" },
                values: new object[,]
                {
                    { 88, 88, 123, "Кастамере", 18, 1 },
                    { 87, 87, 123, "Скала", 18, 1 },
                    { 86, 86, 123, "Гибельная крепость", 18, 1 },
                    { 85, 85, 123, "Виндхолл", 18, 1 },
                    { 84, 84, 122, "Каменная септа", 17, 1 },
                    { 83, 83, 122, "Каслвуд", 17, 1 },
                    { 82, 82, 122, "Приют странника", 17, 1 },
                    { 81, 81, 122, "Розовая дева", 17, 1 },
                    { 59, 59, 116, "Орлиное гнездо", 11, 1 },
                    { 103, 103, 126, "Корнфилд", 21, 1 },
                    { 53, 53, 116, "Змеиный лес", 11, 1 },
                    { 51, 51, 116, "Ледяной ручей", 11, 1 },
                    { 23, 23, 110, "Родники", 5, 1 },
                    { 22, 22, 110, "Каменный берег", 5, 1 },
                    { 21, 21, 110, "Торхенов удел", 5, 1 },
                    { 19, 19, 109, "Замок Сервинов", 4, 1 },
                    { 18, 18, 109, "Чёрная заводь", 4, 1 },
                    { 17, 17, 109, "Хорнвуд", 4, 1 },
                    { 16, 16, 109, "Вдовий дозор", 4, 1 },
                    { 15, 15, 109, "Дредфорт", 4, 1 },
                    { 20, 20, 108, "Волчий лес", 3, 1 },
                    { 14, 14, 108, "Винтерфелл", 3, 1 },
                    { 24, 24, 110, "Барроутон", 5, 1 },
                    { 13, 13, 108, "Железный холм", 3, 1 },
                    { 11, 11, 108, "Мыс морского дракона", 3, 1 },
                    { 10, 10, 108, "Медвежий остров", 3, 1 },
                    { 9, 9, 107, "Каменный холм", 2, 1 },
                    { 8, 8, 107, "Вершина", 2, 1 },
                    { 7, 7, 107, "Последний очаг", 2, 1 },
                    { 6, 6, 107, "Кархолд", 2, 1 },
                    { 5, 5, 107, "Скагос", 2, 1 },
                    { 4, 4, 106, "Новый дар", 1, 1 },
                    { 3, 3, 106, "Восточный дозор", 1, 1 },
                    { 2, 2, 106, "Чёрный замок", 1, 1 },
                    { 12, 12, 108, "Темнолесье", 3, 1 },
                    { 30, 30, 110, "Кремневый палец", 5, 1 },
                    { 25, 25, 111, "Белая гавань", 6, 1 },
                    { 26, 26, 111, "Бараньи ворота", 6, 1 },
                    { 50, 50, 116, "Персты", 11, 1 },
                    { 49, 49, 115, "Сосцы", 10, 1 },
                    { 48, 48, 115, "Галечный остров", 10, 1 },
                    { 47, 47, 115, "Малая сестра", 10, 1 }
                });

            migrationBuilder.InsertData(
                table: "Titles",
                columns: new[] { "Id", "CapitalId", "JureSuzerainId", "Name", "OwnerId", "Rank" },
                values: new object[,]
                {
                    { 46, 46, 115, "Милая сестра", 10, 1 },
                    { 45, 45, 115, "Длинная сестра", 10, 1 },
                    { 43, 43, 114, "Пайк", 9, 1 },
                    { 42, 42, 114, "Лордпорт", 9, 1 },
                    { 41, 41, 114, "Железная роща", 9, 1 },
                    { 36, 36, 114, "Гольцы", 9, 1 },
                    { 35, 35, 114, "Солёный утёс", 9, 1 },
                    { 44, 44, 113, "Волмарк", 8, 1 },
                    { 40, 40, 113, "Камнедрев", 8, 1 },
                    { 39, 39, 113, "Десять башен", 8, 1 },
                    { 38, 38, 113, "Оркмонт", 8, 1 },
                    { 37, 37, 112, "Пебблтон", 7, 1 },
                    { 34, 34, 112, "Одинокий светоч", 7, 1 },
                    { 33, 33, 112, "Хаммерхорн", 7, 1 },
                    { 32, 32, 112, "Старый Вик", 7, 1 },
                    { 31, 31, 112, "Чёрная волна", 7, 1 },
                    { 29, 29, 111, "Перешеек", 6, 1 },
                    { 28, 28, 111, "Ров Кайлин", 6, 1 },
                    { 27, 27, 111, "Старый замок", 6, 1 },
                    { 52, 52, 116, "Суровая песнь", 11, 1 },
                    { 104, 104, 126, "Гринфилд", 21, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_LastActivity",
                table: "AspNetUsers",
                column: "LastActivity");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_DynastyId",
                table: "Characters",
                column: "DynastyId");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_SuzerainId",
                table: "Characters",
                column: "SuzerainId");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_UserId",
                table: "Characters",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Titles_CapitalId_Rank",
                table: "Titles",
                columns: new[] { "CapitalId", "Rank" });

            migrationBuilder.CreateIndex(
                name: "IX_Titles_JureSuzerainId",
                table: "Titles",
                column: "JureSuzerainId");

            migrationBuilder.CreateIndex(
                name: "IX_Titles_OwnerId",
                table: "Titles",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Titles_Rank",
                table: "Titles",
                column: "Rank");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Titles");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Characters");

            migrationBuilder.DropTable(
                name: "Domains");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Dynasties");
        }
    }
}
