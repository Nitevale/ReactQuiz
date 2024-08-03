using System.ComponentModel.DataAnnotations;

namespace BE.Models.Domain
{
    public class QuestionEntity
    {
        [Key]
        public int QuestionID { get; set; }  // Primary Key
        public required string QuestionText { get; set; }

        public ICollection<Choice> Choices { get; set; }

        // public Question()
        // {
        //     Choices = new HashSet<Choice>();
        // }
    }
}