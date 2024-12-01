using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetDeclarationsApi.Migrations
{
    /// <inheritdoc />
    public partial class CorrectedDataTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "AssetDeclarations",
                newName: "Date");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "RealEstate",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "AssetDeclarations",
                newName: "DateTime");

            migrationBuilder.AlterColumn<double>(
                name: "Description",
                table: "RealEstate",
                type: "float",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
