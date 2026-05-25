using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddApplianceFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplianceCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplianceCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    BillingMonth = table.Column<DateOnly>(type: "date", nullable: false),
                    GenerationAmount = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    TransmissionAmount = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    DistributionAmount = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    GovernmentTaxAmount = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    EnergyKwh = table.Column<decimal>(type: "numeric(12,3)", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bills_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnergyTariff",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UtilityName = table.Column<string>(type: "text", nullable: false),
                    Region = table.Column<string>(type: "text", nullable: false),
                    RatePerKwh = table.Column<decimal>(type: "numeric(12,4)", nullable: false),
                    EffectiveFrom = table.Column<DateOnly>(type: "date", nullable: false),
                    EffectiveTo = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnergyTariff", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Body = table.Column<string>(type: "text", nullable: false),
                    ReadAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recommendations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    TipType = table.Column<string>(type: "text", nullable: false),
                    EstimatedSavingsAmount = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    SavingsUntil = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    ApplicationUserId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recommendations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recommendations_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Appliances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ApplianceCategoryId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    RatedWatts = table.Column<int>(type: "integer", nullable: false),
                    InverterCapable = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    ApplicationUserId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appliances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appliances_ApplianceCategories_ApplianceCategoryId",
                        column: x => x.ApplianceCategoryId,
                        principalTable: "ApplianceCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appliances_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ApplianceUsageLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ApplianceId = table.Column<Guid>(type: "uuid", nullable: false),
                    HoursPerDay = table.Column<decimal>(type: "numeric(6,2)", nullable: false),
                    DaysPerWeek = table.Column<int>(type: "integer", nullable: false),
                    WeeksPerMonth = table.Column<int>(type: "integer", nullable: false),
                    DaysUsedMask = table.Column<short>(type: "smallint", nullable: false),
                    AverageWatts = table.Column<int>(type: "integer", nullable: false),
                    EnergyKwh = table.Column<decimal>(type: "numeric(12,3)", nullable: false),
                    CostAmount = table.Column<decimal>(type: "numeric(12,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplianceUsageLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplianceUsageLogs_Appliances_ApplianceId",
                        column: x => x.ApplianceId,
                        principalTable: "Appliances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CostEstimations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ApplianceId = table.Column<Guid>(type: "uuid", nullable: false),
                    TariffId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProfileName = table.Column<string>(type: "text", nullable: false),
                    Wattage = table.Column<int>(type: "integer", nullable: false),
                    HoursPerDay = table.Column<decimal>(type: "numeric(6,2)", nullable: false),
                    IsInverter = table.Column<bool>(type: "boolean", nullable: false),
                    EstimatedMonthlyCost = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    EstimatedAnnualCost = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    ApplicationUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    EnergyTariffId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CostEstimations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CostEstimations_Appliances_ApplianceId",
                        column: x => x.ApplianceId,
                        principalTable: "Appliances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CostEstimations_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CostEstimations_EnergyTariff_EnergyTariffId",
                        column: x => x.EnergyTariffId,
                        principalTable: "EnergyTariff",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appliances_ApplianceCategoryId",
                table: "Appliances",
                column: "ApplianceCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Appliances_ApplicationUserId",
                table: "Appliances",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplianceUsageLogs_ApplianceId",
                table: "ApplianceUsageLogs",
                column: "ApplianceId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_UserId",
                table: "Bills",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CostEstimations_ApplianceId",
                table: "CostEstimations",
                column: "ApplianceId");

            migrationBuilder.CreateIndex(
                name: "IX_CostEstimations_ApplicationUserId",
                table: "CostEstimations",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CostEstimations_EnergyTariffId",
                table: "CostEstimations",
                column: "EnergyTariffId");

            migrationBuilder.CreateIndex(
                name: "IX_Recommendations_ApplicationUserId",
                table: "Recommendations",
                column: "ApplicationUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplianceUsageLogs");

            migrationBuilder.DropTable(
                name: "Bills");

            migrationBuilder.DropTable(
                name: "CostEstimations");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Recommendations");

            migrationBuilder.DropTable(
                name: "Appliances");

            migrationBuilder.DropTable(
                name: "EnergyTariff");

            migrationBuilder.DropTable(
                name: "ApplianceCategories");
        }
    }
}
