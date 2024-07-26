using System.ComponentModel.DataAnnotations;

namespace BE.Models.Domain
{
    public class UserEntity
    {
        [Key]
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
    }
}