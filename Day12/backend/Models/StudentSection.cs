using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Day6.Models;

[Table("student_sections")]
public class StudentSection
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("student_id")]
    public int StudentId { get; set; }

    public Student Student { get; set; } = null!;

    [Required]
    [Column("section_id")]
    public int SectionId { get; set; }

    public Section Section { get; set; } = null!;

    [Column("enrolled_at")]
    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
}
