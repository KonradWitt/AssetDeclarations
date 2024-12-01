using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetDeclarationsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedPartiesAndAssetDeclarations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PartyId",
                table: "Persons",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AssetDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
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

            migrationBuilder.CreateIndex(
                name: "IX_Persons_PartyId",
                table: "Persons",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetDeclarations_PersonId",
                table: "AssetDeclarations",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Parties_PartyId",
                table: "Persons",
                column: "PartyId",
                principalTable: "Parties",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Parties_PartyId",
                table: "Persons");

            migrationBuilder.DropTable(
                name: "AssetDeclarations");

            migrationBuilder.DropTable(
                name: "Parties");

            migrationBuilder.DropIndex(
                name: "IX_Persons_PartyId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "PartyId",
                table: "Persons");
        }
    }
}
