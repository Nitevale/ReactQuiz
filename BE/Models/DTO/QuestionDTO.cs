namespace BE.Models.DTO
{
    public class QuestionDTO
    {
        public Guid QuestionId { get; set; }
        public string QuestionText { get; set; }
        public ICollection<ChoiceDTO> Choices { get; set; }
    }
}


