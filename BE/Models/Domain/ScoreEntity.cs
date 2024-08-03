using System.ComponentModel.DataAnnotations;
using BE.Models.Domain;

public class ScoreEntity
{
    public int Id { get; set; }
    public required string ExamineeName { get; set; }
    public int Score { get; set; }
    public DateTime DateTaken { get; set; } = DateTime.Now;
}
