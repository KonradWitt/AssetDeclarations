using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetDeclarationsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedPersonalPropertiesAndIncomes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CashPosition_AssetDeclarations_AssetDeclarationId",
                table: "CashPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_Liability_AssetDeclarations_AssetDeclarationId",
                table: "Liability");

            migrationBuilder.DropForeignKey(
                name: "FK_SecurityPosition_AssetDeclarations_AssetDeclarationId",
                table: "SecurityPosition");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SecurityPosition",
                table: "SecurityPosition");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Liability",
                table: "Liability");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CashPosition",
                table: "CashPosition");

            migrationBuilder.RenameTable(
                name: "SecurityPosition",
                newName: "SecurityPositions");

            migrationBuilder.RenameTable(
                name: "Liability",
                newName: "Liabilities");

            migrationBuilder.RenameTable(
                name: "CashPosition",
                newName: "CashPositions");

            migrationBuilder.RenameIndex(
                name: "IX_SecurityPosition_AssetDeclarationId",
                table: "SecurityPositions",
                newName: "IX_SecurityPositions_AssetDeclarationId");

            migrationBuilder.RenameIndex(
                name: "IX_Liability_AssetDeclarationId",
                table: "Liabilities",
                newName: "IX_Liabilities_AssetDeclarationId");

            migrationBuilder.RenameIndex(
                name: "IX_CashPosition_AssetDeclarationId",
                table: "CashPositions",
                newName: "IX_CashPositions_AssetDeclarationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SecurityPositions",
                table: "SecurityPositions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Liabilities",
                table: "Liabilities",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CashPositions",
                table: "CashPositions",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Incomes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    YearlyValue = table.Column<double>(type: "float", nullable: false),
                    AssetDeclarationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incomes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Incomes_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PersonalProperties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AssetDeclararionId = table.Column<int>(type: "int", nullable: false),
                    AssetDeclarationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PersonalProperties_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_AssetDeclarationId",
                table: "Incomes",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalProperties_AssetDeclarationId",
                table: "PersonalProperties",
                column: "AssetDeclarationId");

            migrationBuilder.AddForeignKey(
                name: "FK_CashPositions_AssetDeclarations_AssetDeclarationId",
                table: "CashPositions",
                column: "AssetDeclarationId",
                principalTable: "AssetDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Liabilities_AssetDeclarations_AssetDeclarationId",
                table: "Liabilities",
                column: "AssetDeclarationId",
                principalTable: "AssetDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SecurityPositions_AssetDeclarations_AssetDeclarationId",
                table: "SecurityPositions",
                column: "AssetDeclarationId",
                principalTable: "AssetDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CashPositions_AssetDeclarations_AssetDeclarationId",
                table: "CashPositions");

            migrationBuilder.DropForeignKey(
                name: "FK_Liabilities_AssetDeclarations_AssetDeclarationId",
                table: "Liabilities");

            migrationBuilder.DropForeignKey(
                name: "FK_SecurityPositions_AssetDeclarations_AssetDeclarationId",
                table: "SecurityPositions");

            migrationBuilder.DropTable(
                name: "Incomes");

            migrationBuilder.DropTable(
                name: "PersonalProperties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SecurityPositions",
                table: "SecurityPositions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Liabilities",
                table: "Liabilities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CashPositions",
                table: "CashPositions");

            migrationBuilder.RenameTable(
                name: "SecurityPositions",
                newName: "SecurityPosition");

            migrationBuilder.RenameTable(
                name: "Liabilities",
                newName: "Liability");

            migrationBuilder.RenameTable(
                name: "CashPositions",
                newName: "CashPosition");

            migrationBuilder.RenameIndex(
                name: "IX_SecurityPositions_AssetDeclarationId",
                table: "SecurityPosition",
                newName: "IX_SecurityPosition_AssetDeclarationId");

            migrationBuilder.RenameIndex(
                name: "IX_Liabilities_AssetDeclarationId",
                table: "Liability",
                newName: "IX_Liability_AssetDeclarationId");

            migrationBuilder.RenameIndex(
                name: "IX_CashPositions_AssetDeclarationId",
                table: "CashPosition",
                newName: "IX_CashPosition_AssetDeclarationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SecurityPosition",
                table: "SecurityPosition",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Liability",
                table: "Liability",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CashPosition",
                table: "CashPosition",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CashPosition_AssetDeclarations_AssetDeclarationId",
                table: "CashPosition",
                column: "AssetDeclarationId",
                principalTable: "AssetDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Liability_AssetDeclarations_AssetDeclarationId",
                table: "Liability",
                column: "AssetDeclarationId",
                principalTable: "AssetDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SecurityPosition_AssetDeclarations_AssetDeclarationId",
                table: "SecurityPosition",
                column: "AssetDeclarationId",
                principalTable: "AssetDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
