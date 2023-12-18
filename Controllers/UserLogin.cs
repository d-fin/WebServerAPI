using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace WebServerAPI.Controllers
{
    public class UserLogin : Controller
    {
        private readonly IConfiguration _configuration;
        
        public UserLogin(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult QueryUser()
        {
            string? connectionString = _configuration.GetConnectionString("DefaultConnection");

            using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    return Ok(connection);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
        
    }
}
