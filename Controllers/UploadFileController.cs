using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using System; 
using System.IO;
using System.Threading.Tasks;
using WebServerAPI.Data;
using WebServerAPI.Models;

namespace WebServerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadFileController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UploadFileController(MyDbContext context)
        {
            _context = context;
        }

        // UploadFileAsync() handles what happens when a file is uploaded from the files page. 
        [HttpPost]
        public async Task<IActionResult> UploadFileAsync()
        {
            try
            {
                // get the file from the request and make sure it isn't null.
                var file = Request.Form.Files.GetFile("file");

                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file uploaded");
                }

                // copy the file to the server location. 
                var destinationPath = Path.Combine("D:\\Test-CloudStorage", file.FileName);
                using (var stream = new FileStream(destinationPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // once the file is copied, we need to create an instance of FileRecord. 
                // File record does the following: 
                //      - stores the file name. 
                //      - stores the file location on the server.
                //      - stores the date the file was copied to my server. 

                var fileRecord = new FileRecord 
                { 
                    FileName = file.FileName,
                    FilePath = destinationPath,
                    UploadDate = DateTime.UtcNow,
                };

                // save to the database.
                _context.Add(fileRecord);
                await _context.SaveChangesAsync();
                
                return Ok("File uploaded and saved to server");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            
        }

        // GetFilesAsync() handles populating the table that shows all of the files stored on my server. 
        [HttpGet]
        public async Task<IActionResult> GetFilesAsync()
        {
            try
            {
                var data = _context.Files.ToList();

                return Ok(data); 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
