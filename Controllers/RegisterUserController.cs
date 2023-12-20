using Microsoft.AspNetCore.Mvc;
using WebServerAPI.Data;

namespace WebServerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterUserController : ControllerBase
    {
        private readonly MyDbContext _context;

        public RegisterUserController(MyDbContext context)
        {
            _context = context;
        }
    }
}
