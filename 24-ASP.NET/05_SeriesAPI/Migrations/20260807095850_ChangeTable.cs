using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeriesAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "Series",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Series",
                newName: "id");
        }
    }
}
