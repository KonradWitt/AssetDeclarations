using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetDeclarationsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedDocumentsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalProperties_AssetDeclarations_AssetDeclarationId",
                table: "PersonalProperties");

            migrationBuilder.DropColumn(
                name: "AssetDeclararionId",
                table: "PersonalProperties");

            migrationBuilder.AlterColumn<int>(
                name: "AssetDeclarationId",
                table: "PersonalProperties",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DocumentId",
                table: "AssetDeclarations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssetDeclarations_DocumentId",
                table: "AssetDeclarations",
                column: "DocumentId");

            migrationBuilder.AddForeignKey(
                name: "FK_AssetDeclarations_Documents_DocumentId",
                table: "AssetDeclarations",
                column: "DocumentId",
                principalTable: "Documents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalProperties_AssetDeclarations_AssetDeclarationId",
                table: "PersonalProperties",
                column: "AssetDeclarationId",
                principalTable: "AssetDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssetDeclarations_Documents_DocumentId",
                table: "AssetDeclarations");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonalProperties_AssetDeclarations_AssetDeclarationId",
                table: "PersonalProperties");

            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_AssetDeclarations_DocumentId",
                table: "AssetDeclarations");

            migrationBuilder.DropColumn(
                name: "DocumentId",
                table: "AssetDeclarations");

            migrationBuilder.AlterColumn<int>(
                name: "AssetDeclarationId",
                table: "PersonalProperties",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "AssetDeclararionId",
                table: "PersonalProperties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalProperties_AssetDeclarations_AssetDeclarationId",
                table: "PersonalProperties",
                column: "AssetDeclarationId",
                principalTable: "AssetDeclarations",
                principalColumn: "Id");
        }
    }
}
