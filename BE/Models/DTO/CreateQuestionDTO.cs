namespace BE.Models.DTO
{
    public class CreateQuestionDTO
    {
        public string QuestionText { get; set; }
        public ICollection<CreateChoiceDTO> Choices { get; set; }
    }

}


