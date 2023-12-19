using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace WebServerAPI.Models;

public class FileRecord
{
    [Key] public int Id { get; set; }
    public required string FileName { get; set; }
    public string? FilePath { get; set; }
    public DateTime UploadDate { get; set; }
}
