namespace BE.Models.DTO
{
    public class QuestionDTO
    {
        public int QuestionID { get; set; }
        public string QuestionText { get; set; }
        public ICollection<ChoiceDTO> Choices { get; set; }
    }
}


