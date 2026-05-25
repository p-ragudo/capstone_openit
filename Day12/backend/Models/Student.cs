using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Day6.Models;

[Table("students")]
public class Student
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("first_name")]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [Column("last_name")]
    public string LastName { get; set; } = string.Empty;

    [Range(1, 4)]
    [Column("year")]
    public int? Year { get; set; }

    [Required]
    [MaxLength(10)]
    [Column("gender")]
    public string Gender { get; set; } = string.Empty;

    [Column("enrolled")]
    public bool Enrolled { get; set; } = true;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("program_id")]
    public int? ProgramId { get; set; }

    public DegreeProgram? Program { get; set; }

    public List<StudentSection> StudentSections { get; set; } = new();
    public List<StudentGrade> Grades { get; set; } = new();
}
