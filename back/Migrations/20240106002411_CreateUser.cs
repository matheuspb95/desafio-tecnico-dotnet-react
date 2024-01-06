using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DOTNET.Migrations
{
    /// <inheritdoc />
    public partial class CreateUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "id", "access_type", "email", "name", "password", "sur_name" },
                values: new object[] { 1, 0, "admin@admin.com", "Admin", "AQAAAAIAAYagAAAAEG1vONqQEz6DLkYlz7BtSPxEeZjR1e3gwGf2A6Ms7WtSkEe7w7397ic3ZTGjQ5PprA==", "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "id",
                keyValue: 1);
        }
    }
}
