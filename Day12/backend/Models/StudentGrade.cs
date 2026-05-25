using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Day6.Models;

[Table("student_grades")]
public class StudentGrade
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("student_id")]
    public int StudentId { get; set; }

    public Student Student { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    [Column("subject")]
    public string Subject { get; set; } = string.Empty;

    [Range(0, 100)]
    [Column("grade")]
    public decimal Grade { get; set; }
}
