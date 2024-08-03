namespace BE.Models.DTO
{
    public class ScoreResponseDTO
    {
        public int Id { get; set; }
        public required string ExamineeName { get; set; }
        public int Score { get; set; }
        public DateTime DateTaken { get; set; } = DateTime.UtcNow;
    }
}