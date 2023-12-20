namespace WebServerAPI.Models
{
    public class RegisterUser
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }

        public string? Username { get; set; }
        public DateTime AccountCreationDate { get; set; }

    }
}
