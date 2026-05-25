using System.ComponentModel.DataAnnotations;

namespace Day6.DTOs;

public class StudentResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int Year { get; set; }
    public string Gender { get; set; } = "";
    public bool Enrolled { get; set; }
    public string Section { get; set; } = "";
    public string Program { get; set; } = "";
    public decimal? AvgGrade { get; set; }
}

public class CreateStudentDto
{
    [Required]
    public string Name { get; set; } = "";

    [Range(1, 4)]
    public int Year { get; set; }

    [Required]
    public string Gender { get; set; } = "";

    public bool Enrolled { get; set; }

    [Required]
    public string Section { get; set; } = "";

    [Required]
    public string Program { get; set; } = "";

    [Range(0, 100)]
    public decimal Grade { get; set; }
}

public class UpdateStudentDto
{
    [Required]
    public string Name { get; set; } = "";

    [Range(1, 4)]
    public int Year { get; set; }

    [Required]
    public string Gender { get; set; } = "";

    public bool Enrolled { get; set; }

    [Required]
    public string Section { get; set; } = "";

    [Required]
    public string Program { get; set; } = "";

    [Range(0, 100)]
    public decimal Grade { get; set; }
}
