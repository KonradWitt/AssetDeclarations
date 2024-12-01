﻿// <auto-generated />
using System;
using AssetDeclarationsApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AssetDeclarationsApi.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20241201142559_AddedCashSecuritiesRealEstateAndLiabilities")]
    partial class AddedCashSecuritiesRealEstateAndLiabilities
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AssetDeclarationsApi.Entities.AssetDeclaration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("PersonId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("AssetDeclarations");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.CashPosition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AssetDeclarationId")
                        .HasColumnType("int");

                    b.Property<double>("BaseValue")
                        .HasColumnType("float");

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("CurrencyValue")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("AssetDeclarationId");

                    b.ToTable("CashPosition");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.Liability", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AssetDeclarationId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("AssetDeclarationId");

                    b.ToTable("Liability");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.Party", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Parties");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PartyId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PartyId");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.RealEstate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AssetDeclarationId")
                        .HasColumnType("int");

                    b.Property<double>("Description")
                        .HasColumnType("float");

                    b.Property<string>("LegalTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("AssetDeclarationId");

                    b.ToTable("RealEstate");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.SecurityPosition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AssetDeclarationId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Quantity")
                        .HasColumnType("float");

                    b.Property<double?>("Value")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("AssetDeclarationId");

                    b.ToTable("SecurityPosition");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.AssetDeclaration", b =>
                {
                    b.HasOne("AssetDeclarationsApi.Entities.Person", null)
                        .WithMany("AssetDeclarations")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.CashPosition", b =>
                {
                    b.HasOne("AssetDeclarationsApi.Entities.AssetDeclaration", null)
                        .WithMany("CashPositions")
                        .HasForeignKey("AssetDeclarationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.Liability", b =>
                {
                    b.HasOne("AssetDeclarationsApi.Entities.AssetDeclaration", null)
                        .WithMany("Liabilities")
                        .HasForeignKey("AssetDeclarationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.Person", b =>
                {
                    b.HasOne("AssetDeclarationsApi.Entities.Party", null)
                        .WithMany("Persons")
                        .HasForeignKey("PartyId");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.RealEstate", b =>
                {
                    b.HasOne("AssetDeclarationsApi.Entities.AssetDeclaration", null)
                        .WithMany("RealEstate")
                        .HasForeignKey("AssetDeclarationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.SecurityPosition", b =>
                {
                    b.HasOne("AssetDeclarationsApi.Entities.AssetDeclaration", null)
                        .WithMany("SecurityPositions")
                        .HasForeignKey("AssetDeclarationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.AssetDeclaration", b =>
                {
                    b.Navigation("CashPositions");

                    b.Navigation("Liabilities");

                    b.Navigation("RealEstate");

                    b.Navigation("SecurityPositions");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.Party", b =>
                {
                    b.Navigation("Persons");
                });

            modelBuilder.Entity("AssetDeclarationsApi.Entities.Person", b =>
                {
                    b.Navigation("AssetDeclarations");
                });
#pragma warning restore 612, 618
        }
    }
}
