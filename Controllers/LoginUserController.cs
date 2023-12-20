using Microsoft.AspNetCore.Mvc;
using WebServerAPI.Data;

namespace WebServerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginUserController : Controller
    {
        private readonly MyDbContext _context;

        public LoginUserController(MyDbContext context)
        {
            _context = context;
        }
    }
}
