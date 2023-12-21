using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Eventing.Reader;
using WebServerAPI.Data;
using WebServerAPI.Models;
using System.Globalization;
using System.Text.RegularExpressions;

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

        [HttpPost]
        public async Task<IActionResult> Register()
        {
            try
            {
                string? firstName = Request.Form["firstName"];
                string? lastName = Request.Form["lastName"];
                string? email = Request.Form["email"];
                string? password = Request.Form["password"];
                string? confirmPassword = Request.Form["confirmPassword"];

                if (string.IsNullOrWhiteSpace(firstName) ||
                    string.IsNullOrWhiteSpace(lastName) ||
                    string.IsNullOrWhiteSpace(email) ||
                    string.IsNullOrWhiteSpace(password) ||
                    string.IsNullOrWhiteSpace(confirmPassword))
                {
                    return BadRequest("Fields cannot be empty.");

                }
                else if (password != confirmPassword)
                {
                    return BadRequest("Passwords do not match.");
                }
                else if (!IsStrongPassword(password))
                {
                    return BadRequest("Password is not strong enough.");
                }
                else if (!IsValidEmail(email))
                {
                    return BadRequest("Enter a valid email");
                }
                else
                {
                    TextInfo textInfo = CultureInfo.CurrentCulture.TextInfo;
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
                    var user = new User
                    {
                        FirstName = textInfo.ToTitleCase(firstName),
                        LastName = textInfo.ToTitleCase(lastName),
                        Email = email,
                        Password = hashedPassword,

                        // generate a username and date registered
                        Username = GenerateUsername(firstName, lastName),
                        AccountCreationDate = DateTime.UtcNow,
                    };

                    _context.User.Add(user);
                    await _context.SaveChangesAsync();

                    return Ok();
                }
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private bool IsValidEmail(string email)
        {
            string pattern = @"^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$";
            return Regex.IsMatch(email, pattern);
        }

        private static string GenerateUsername(string firstName, string lastName)
        {
            if (string.IsNullOrWhiteSpace(firstName) || string.IsNullOrWhiteSpace(lastName))
            {
                throw new ArgumentException("Both first name and last name must be provided.");
            }

            char firstLetter = char.ToLower(firstName[0]);
            string lastNamePart = lastName.Length > 3 ? lastName.Substring(0, 3) : lastName;
            string username = $"{firstLetter}{lastNamePart}";

            return username.ToLower();
        }

        private bool IsStrongPassword(string password)
        {
            return true;
           /* if (password.Length < 8 || !password.Any(char.IsUpper) || !password.Any(char.IsLower) || !password.Any(char.IsDigit))
            {
                return true;
            }
            else
            {
                return false;
            }*/
        }
    }
}
