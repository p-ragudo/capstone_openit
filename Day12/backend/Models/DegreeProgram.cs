using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Day6.Models;

[Table("programs")]
public class DegreeProgram
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("program_name")]
    public string ProgramName { get; set; } = string.Empty;

    public List<Student> Students { get; set; } = new();
    public List<Section> Sections { get; set; } = new();
}
