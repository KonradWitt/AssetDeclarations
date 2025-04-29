using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetDeclarationsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddLinkColumnToPersonsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "Persons",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.Sql(@"
        UPDATE Persons
        SET Link = LOWER(REPLACE(CONCAT(FirstName, '-', LastName), ' ', '-'))
        WHERE Link IS NULL OR Link = '';
    ");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_Link",
                table: "Persons",
                column: "Link",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Persons_Link",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "Link",
                table: "Persons");
        }
    }
}
