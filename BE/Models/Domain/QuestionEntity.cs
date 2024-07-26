using System.ComponentModel.DataAnnotations;

namespace BE.Models.Domain
{
    public class QuestionEntity
    {
        [Key]
        public Guid QuestionID { get; set; }  // Primary Key
        public string QuestionText { get; set; }  // Text of the question

        // Navigation property to related choices
        public ICollection<Choice> Choices { get; set; }

        // public Question()
        // {
        //     Choices = new HashSet<Choice>();
        // }
    }
}