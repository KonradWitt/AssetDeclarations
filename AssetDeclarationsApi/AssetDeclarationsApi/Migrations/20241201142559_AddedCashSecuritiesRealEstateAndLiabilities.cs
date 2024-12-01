using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetDeclarationsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedCashSecuritiesRealEstateAndLiabilities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CashPosition",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrencyValue = table.Column<double>(type: "float", nullable: false),
                    BaseValue = table.Column<double>(type: "float", nullable: false),
                    AssetDeclarationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashPosition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CashPosition_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Liability",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<double>(type: "float", nullable: false),
                    AssetDeclarationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Liability", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Liability_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RealEstate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<double>(type: "float", nullable: false),
                    Value = table.Column<double>(type: "float", nullable: false),
                    LegalTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AssetDeclarationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RealEstate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RealEstate_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SecurityPosition",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: true),
                    Value = table.Column<double>(type: "float", nullable: true),
                    AssetDeclarationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecurityPosition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SecurityPosition_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CashPosition_AssetDeclarationId",
                table: "CashPosition",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_Liability_AssetDeclarationId",
                table: "Liability",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_RealEstate_AssetDeclarationId",
                table: "RealEstate",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_SecurityPosition_AssetDeclarationId",
                table: "SecurityPosition",
                column: "AssetDeclarationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CashPosition");

            migrationBuilder.DropTable(
                name: "Liability");

            migrationBuilder.DropTable(
                name: "RealEstate");

            migrationBuilder.DropTable(
                name: "SecurityPosition");
        }
    }
}
