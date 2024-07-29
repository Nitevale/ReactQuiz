using BE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BE.Models.Domain;
using BE.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly DataContext _context;

        public QuizController(DataContext context)
        {
            _context = context;
        }

        // GET: api/quiz
        [HttpGet]
        public async Task<IActionResult> GetAllQuestions()
        {
            var questions = await _context.Questions
                .Include(q => q.Choices)
                .ToListAsync();

            var questionDTOs = questions.Select(q => new QuestionDTO
            {
                QuestionID = q.QuestionID,
                QuestionText = q.QuestionText,
                Choices = q.Choices.Select(c => new ChoiceDTO
                {
                    ChoiceId = c.ChoiceId,
                    ChoiceText = c.ChoiceText,
                    IsCorrect = c.IsCorrect
                }).ToList()
            });

            return Ok(questionDTOs);
        }

        // GET: api/quiz/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion(int id)
        {
            var question = await _context.Questions
                .Include(q => q.Choices)
                .FirstOrDefaultAsync(q => q.QuestionID == id);

            if (question == null)
            {
                return NotFound();
            }

            var questionDTO = new QuestionDTO
            {
                QuestionID = question.QuestionID,
                QuestionText = question.QuestionText,
                Choices = question.Choices.Select(c => new ChoiceDTO
                {
                    ChoiceId = c.ChoiceId,
                    ChoiceText = c.ChoiceText,
                    IsCorrect = c.IsCorrect
                }).ToList()
            };

            return Ok(questionDTO);
        }

        // POST: api/quiz
        [HttpPost]
        public async Task<IActionResult> CreateQuestion([FromBody] CreateQuestionDTO dto)
        {
            if (dto == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = new QuestionEntity
            {
                QuestionText = dto.QuestionText,
                Choices = dto.Choices.Select(c => new Choice
                {
                    ChoiceText = c.ChoiceText,
                    IsCorrect = c.IsCorrect
                }).ToList()
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            var createdQuestionDTO = new QuestionDTO
            {
                QuestionID = question.QuestionID,
                QuestionText = question.QuestionText,
                Choices = question.Choices.Select(c => new ChoiceDTO
                {
                    ChoiceId = c.ChoiceId,
                    ChoiceText = c.ChoiceText,
                    IsCorrect = c.IsCorrect
                }).ToList()
            };

            return CreatedAtAction(nameof(GetQuestion), new { id = question.QuestionID }, createdQuestionDTO);
        }

        // PUT: api/quiz/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, [FromBody] CreateQuestionDTO dto)
        {
            if (dto == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions
                .Include(q => q.Choices)
                .FirstOrDefaultAsync(q => q.QuestionID == id);

            if (question == null)
            {
                return NotFound();
            }

            question.QuestionText = dto.QuestionText;
            question.Choices = dto.Choices.Select(c => new Choice
            {
                ChoiceText = c.ChoiceText,
                IsCorrect = c.IsCorrect
            }).ToList();

            _context.Entry(question).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var updatedQuestionDTO = new QuestionDTO
            {
                QuestionID = question.QuestionID,
                QuestionText = question.QuestionText,
                Choices = question.Choices.Select(c => new ChoiceDTO
                {
                    ChoiceId = c.ChoiceId,
                    ChoiceText = c.ChoiceText,
                    IsCorrect = c.IsCorrect
                }).ToList()
            };

            return Ok(updatedQuestionDTO);
        }

        // DELETE: api/quiz/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(Guid id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}