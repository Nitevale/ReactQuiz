using BE.Models.Domain;

public class Choice
{
    public Guid ChoiceId { get; set; }  // Primary Key
    public Guid QuestionId { get; set; }  // Foreign Key
    public string ChoiceText { get; set; }  // Text of the choice
    public bool IsCorrect { get; set; }  // Indicator for the correct choice

    // Navigation property to the related question
    public QuestionEntity Question { get; set; }
}
