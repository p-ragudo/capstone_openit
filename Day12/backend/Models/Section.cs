using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Day6.Models;

[Table("sections")]
public class Section
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(20)]
    [Column("code")]
    public string Code { get; set; } = string.Empty;

    [Range(1, 4)]
    [Column("year")]
    public int? Year { get; set; }

    [Required]
    [Column("program_id")]
    public int ProgramId { get; set; }

    public DegreeProgram Program { get; set; } = null!;

    public List<StudentSection> StudentSections { get; set; } = new();
}
