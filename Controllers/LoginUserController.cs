using Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Internal;
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

        [HttpPost]
        public async Task<IActionResult> Login()
        {
            try
            {
                string? username = Request.Form["username"];
                string? password = Request.Form["password"];

                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                {
                    return BadRequest("Empty fields not allowed.");
                }
                else
                {
                    var user = _context.User.FirstOrDefault(u => u.Username == username);

                    if (user == null)
                    {
                        return BadRequest("Invalid username or password");
                    }
                    else
                    {
                        //string hashedEnteredPassword = BCrypt.Net.BCrypt.HashPassword(password);
                        //if (hashedEnteredPassword != user.Password)
                        if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
                        {
                            return BadRequest("Invalid username or password");
                        }
                        else
                        {
                            HttpContext.Session.SetString("username", username);

                            return Ok(username);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
