using System.ComponentModel.DataAnnotations;
using BE.Models.Domain;

public class Choice
{
    [Key]
    public int ChoiceId { get; set; }  // Primary Key
    public int QuestionID { get; set; }  // Foreign Key
    public required string ChoiceText { get; set; }  // Text of the choice
    public bool IsCorrect { get; set; }  // Indicator for the correct choice

    // Navigation property to the related question
    public QuestionEntity Question { get; set; }
}
