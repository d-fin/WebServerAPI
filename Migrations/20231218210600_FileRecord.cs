using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebServerAPI.Migrations
{
    /// <inheritdoc />
    public partial class FileRecord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "Files",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Files",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadDate",
                table: "Files",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "UploadDate",
                table: "Files");

            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "Files",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
