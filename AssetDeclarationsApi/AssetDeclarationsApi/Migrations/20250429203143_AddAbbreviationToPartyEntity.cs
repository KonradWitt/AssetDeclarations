using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetDeclarationsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddAbbreviationToPartyEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Abbreviation",
                table: "Parties",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 1,
                column: "Abbreviation",
                value: "KO");

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 2,
                column: "Abbreviation",
                value: null);

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 3,
                column: "Abbreviation",
                value: null);

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 4,
                column: "Abbreviation",
                value: null);

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Abbreviation", "Name" },
                values: new object[] { "PSL", "Polskie Stronnictwo Ludowe" });

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 6,
                column: "Abbreviation",
                value: null);

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 7,
                column: "Abbreviation",
                value: "PiS");

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 8,
                column: "Abbreviation",
                value: null);

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 9,
                column: "Abbreviation",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Abbreviation",
                table: "Parties");

            migrationBuilder.UpdateData(
                table: "Parties",
                keyColumn: "Id",
                keyValue: 5,
                column: "Name",
                value: "PSL");
        }
    }
}
