using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebServerAPI.Data;

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
        public async Task<IActionResult> DownloadFileAsync(int id)
        {
            try
            {

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
