using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetDeclarationsApi.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlaceOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PartyId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Persons_Parties_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Parties",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AssetDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetDeclarations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssetDeclarations_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BusinessActivities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusinessName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Income = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AssetDeclarationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessActivities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessActivities_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CashPositions",
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
                    table.PrimaryKey("PK_CashPositions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CashPositions_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    AssetDeclarationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Documents_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "Liabilities",
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
                    table.PrimaryKey("PK_Liabilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Liabilities_AssetDeclarations_AssetDeclarationId",
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
                    Value = table.Column<double>(type: "float", nullable: false),
                    AssetDeclarationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PersonalProperties_AssetDeclarations_AssetDeclarationId",
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
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                name: "Receivables",
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
                    table.PrimaryKey("PK_Receivables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Receivables_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SecurityPositions",
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
                    table.PrimaryKey("PK_SecurityPositions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SecurityPositions_AssetDeclarations_AssetDeclarationId",
                        column: x => x.AssetDeclarationId,
                        principalTable: "AssetDeclarations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssetDeclarations_PersonId",
                table: "AssetDeclarations",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessActivities_AssetDeclarationId",
                table: "BusinessActivities",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_CashPositions_AssetDeclarationId",
                table: "CashPositions",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_AssetDeclarationId",
                table: "Documents",
                column: "AssetDeclarationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_AssetDeclarationId",
                table: "Incomes",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_Liabilities_AssetDeclarationId",
                table: "Liabilities",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalProperties_AssetDeclarationId",
                table: "PersonalProperties",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_PartyId",
                table: "Persons",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_RealEstate_AssetDeclarationId",
                table: "RealEstate",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_Receivables_AssetDeclarationId",
                table: "Receivables",
                column: "AssetDeclarationId");

            migrationBuilder.CreateIndex(
                name: "IX_SecurityPositions_AssetDeclarationId",
                table: "SecurityPositions",
                column: "AssetDeclarationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusinessActivities");

            migrationBuilder.DropTable(
                name: "CashPositions");

            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.DropTable(
                name: "Incomes");

            migrationBuilder.DropTable(
                name: "Liabilities");

            migrationBuilder.DropTable(
                name: "PersonalProperties");

            migrationBuilder.DropTable(
                name: "RealEstate");

            migrationBuilder.DropTable(
                name: "Receivables");

            migrationBuilder.DropTable(
                name: "SecurityPositions");

            migrationBuilder.DropTable(
                name: "AssetDeclarations");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Parties");
        }
    }
}
