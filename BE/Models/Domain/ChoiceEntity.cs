using System.ComponentModel.DataAnnotations;
using BE.Models.Domain;

public class Choice
{
    [Key]
    public int ChoiceID { get; set; }  // Primary Key
    public int QuestionID { get; set; }  // Foreign Key
    public required string ChoiceText { get; set; }
    public required bool IsCorrect { get; set; }

    public QuestionEntity Question { get; set; }
}
