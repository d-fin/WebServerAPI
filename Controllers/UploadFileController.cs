using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System; 
using System.IO;
using System.Threading.Tasks;
using WebServerAPI.Data;
using WebServerAPI.Models;

namespace WebServerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadFileController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly MyDbContext _context;

        public UploadFileController(IConfiguration configuration, MyDbContext dbContext)
        {
            _configuration = configuration;
            _context = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0]; 

                if (file.Length > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var filePath = Path.Combine("YourUploadDirectory", fileName); // Replace with the actual directory path

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var fileRecord = new FileRecord
                    {
                        FilePath = filePath,
                        FileName = fileName,
                        UploadDate = DateTime.Now
                    };

                    _context.FileRecord.Add(fileRecord);
                    await _context.SaveChangesAsync();

                    return Ok("File uploaded and record saved successfully.");
                }
                else
                {
                    return BadRequest("No file uploaded.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
