using BE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BE.Models.Domain;
using BE.Models.DTO;
using System.Diagnostics;
using System.Linq;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _context.User.ToList();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public IActionResult GetUser(string username)
        {
            Debug.WriteLine($"Username: {username}");
            var user = _context.User.FirstOrDefault(x => x.Username == username);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        public IActionResult CreateUser(UserEntity user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (_context.User.Any(u => u.Username == user.Username))
                {
                    return Conflict("Username already exists."); // Conflict response
                }

                _context.User.Add(user);
                _context.SaveChanges();
                return Ok(user);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserDTO userDto)
        {
            Console.WriteLine($"Received Username: {userDto.Username}, Password: {userDto.Password}");

            var user = _context.User.FirstOrDefault(x => x.Username == userDto.Username && x.Password == userDto.Password);

            if (user == null)
            {
                Console.WriteLine("User not found or invalid credentials");
                return Unauthorized("Invalid username or password.");
            }

            return Ok(new { Message = "Login successful", User = user.Role });
        }

    }
}