using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WebServerAPI.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net; 

namespace WebServerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadFileController : Controller
    {
        private readonly MyDbContext _context;
        public DownloadFileController(MyDbContext context) 
        { 
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> DownloadFileAsync()
        {
            try
            {
                if (Request.Form.TryGetValue("id", out var idVal))
                {
                    int id = int.Parse(idVal); 

                    var file = await _context.Files.FindAsync(id);
                    if (file != null)
                    {
                        var path = file.FilePath; 
                        if (path != null)
                        {
                            var fileBytes = System.IO.File.ReadAllBytes(path);
                           
                            Response.Headers.Add("Content-Disposition", $"attachment; filename={file.FileName}");
                            Response.Headers.Add("Content-Type", "application/octet-stream");

                            return File(fileBytes, "application/octet-stream", $"{file.FileName}");
                        }
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteFileAsync()
        {
            try
            {
                if (Request.Form.TryGetValue("id", out var idVal))
                {
                    int id = int.Parse(idVal);
                    var file = await _context.Files.FindAsync(id);

                    if (file != null)
                    {
                        if (!string.IsNullOrEmpty(file.FilePath))
                        {
                            if (System.IO.File.Exists(file.FilePath))
                            {
                                // delete the file on the server. 
                                System.IO.File.Delete(file.FilePath);

                                // delete info from database
                                _context.Files.Remove(file);
                                await _context.SaveChangesAsync();

                                return Ok();
                            }
                        }
                    }
                }
                return NotFound();
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
