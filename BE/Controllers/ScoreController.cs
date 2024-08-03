using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.Models.Domain;
using Microsoft.EntityFrameworkCore;
using BE.Models;
using BE.Models.DTO;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        private readonly DataContext _context;

        public ScoreController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Score
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScoreResponseDTO>>> GetScores()
        {
            var scores = await _context.Scores
                .Select(s => new ScoreResponseDTO
                {
                    Id = s.Id,
                    ExamineeName = s.ExamineeName,
                    Score = s.Score,
                    DateTaken = s.DateTaken
                })
                .ToListAsync();

            return Ok(scores);
        }

        // GET: api/Score/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ScoreResponseDTO>> GetScore(int id)
        {
            var score = await _context.Scores.FindAsync(id);

            if (score == null)
            {
                return NotFound();
            }

            var scoreDto = new ScoreResponseDTO
            {
                Id = score.Id,
                ExamineeName = score.ExamineeName,
                Score = score.Score,
                DateTaken = score.DateTaken
            };

            return Ok(scoreDto);
        }

        // POST: api/Score
        [HttpPost]
        public async Task<ActionResult<ScoreResponseDTO>> PostScore(ScoreDTO scoreDto)
        {
            var score = new ScoreEntity
            {
                ExamineeName = scoreDto.ExamineeName,
                Score = scoreDto.Score,
                DateTaken = DateTime.Now
            };

            _context.Scores.Add(score);
            await _context.SaveChangesAsync();

            var responseDto = new ScoreResponseDTO
            {
                Id = score.Id,
                ExamineeName = score.ExamineeName,
                Score = score.Score,
                DateTaken = score.DateTaken
            };

            return CreatedAtAction(nameof(GetScore), new { id = score.Id }, responseDto);
        }

        // PUT: api/Score/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScore(int id, ScoreDTO scoreDto)
        {
            var score = await _context.Scores.FindAsync(id);
            if (score == null)
            {
                return NotFound();
            }

            score.ExamineeName = scoreDto.ExamineeName;
            score.Score = scoreDto.Score;

            _context.Entry(score).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Score/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScore(int id)
        {
            var score = await _context.Scores.FindAsync(id);
            if (score == null)
            {
                return NotFound();
            }

            _context.Scores.Remove(score);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScoreExists(int id)
        {
            return _context.Scores.Any(e => e.Id == id);
        }
    }
}
