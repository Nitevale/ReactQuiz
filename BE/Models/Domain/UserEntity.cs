using System.ComponentModel.DataAnnotations;

namespace BE.Models.Domain
{
    public class UserEntity
    {
        [Key]
        public int UserID { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }
}