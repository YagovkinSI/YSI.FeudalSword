using Microsoft.EntityFrameworkCore.Migrations;

namespace YSI.FeudalSword.Web.Migrations
{
    public partial class CreateCommands : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WarrioirCount",
                table: "Characters",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Commands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CharacterId = table.Column<int>(type: "int", nullable: false),
                    CommandType = table.Column<int>(type: "int", nullable: false),
                    CommandTargetId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Commands_Characters_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 1,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 2,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 3,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 4,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 5,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 6,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 7,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 8,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 9,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 10,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 11,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 12,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 13,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 14,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 15,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 16,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 17,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 18,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 19,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 20,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.UpdateData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 21,
                column: "WarrioirCount",
                value: 3000);

            migrationBuilder.CreateIndex(
                name: "IX_Commands_CharacterId",
                table: "Commands",
                column: "CharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_Commands_CommandType_CommandTargetId",
                table: "Commands",
                columns: new[] { "CommandType", "CommandTargetId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Commands");

            migrationBuilder.DropColumn(
                name: "WarrioirCount",
                table: "Characters");
        }
    }
}
