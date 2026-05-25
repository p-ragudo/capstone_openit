using Day6.Models;

namespace Day6.Data;

internal static class SeedFixtures
{
    internal static (
        List<DegreeProgram> Programs,
        List<Section> Sections,
        List<Student> Students,
        List<StudentSection> StudentSections,
        List<StudentGrade> Grades
    ) Build()
    {
        var bsit = new DegreeProgram { ProgramName = "BSIT" };
        var bscs = new DegreeProgram { ProgramName = "BSCS" };
        var bsis = new DegreeProgram { ProgramName = "BSIS" };

        var sections = new List<Section>
        {
            new() { Code = "IT-1A", Year = 1, Program = bsit },
            new() { Code = "IT-2B", Year = 2, Program = bsit },
            new() { Code = "CS-1A", Year = 1, Program = bscs },
            new() { Code = "IS-3A", Year = 3, Program = bsis },
            new() { Code = "IT-4A", Year = 4, Program = bsit },
            new() { Code = "CS-2A", Year = 2, Program = bscs },
            new() { Code = "IS-1B", Year = 1, Program = bsis },
            new() { Code = "IT-3C", Year = 3, Program = bsit },
            new() { Code = "CS-2B", Year = 2, Program = bscs },
            new() { Code = "IS-4A", Year = 4, Program = bsis },
            new() { Code = "IT-3A", Year = 3, Program = bsit },
            new() { Code = "CS-1C", Year = 1, Program = bscs },
        };

        var students = new List<Student>
        {
            new() { FirstName = "Alice",     LastName = "Dela Cruz", Year = 1, Gender = "Female", Program = bsit, Enrolled = true,  CreatedAt = DateTime.UtcNow },
            new() { FirstName = "Michael",   LastName = "Reyes",     Year = 2, Gender = "Male",   Program = bsit, Enrolled = true,  CreatedAt = DateTime.UtcNow },
            new() { FirstName = "Mark",      LastName = "Bautista",  Year = 1, Gender = "Male",   Program = bscs, Enrolled = true,  CreatedAt = DateTime.UtcNow },
            new() { FirstName = "David",     LastName = "Gomez",     Year = 3, Gender = "Male",   Program = bsis, Enrolled = false, CreatedAt = DateTime.UtcNow },
            new() { FirstName = "Kathryn",   LastName = "Bernardo",  Year = 4, Gender = "Female", Program = bsit, Enrolled = true,  CreatedAt = DateTime.UtcNow },
            new() { FirstName = "Joshua",    LastName = "Garcia",    Year = 2, Gender = "Male",   Program = bscs, Enrolled = true,  CreatedAt = DateTime.UtcNow },
            new() { FirstName = "Liza",      LastName = "Soberano",  Year = 1, Gender = "Female", Program = bsis, Enrolled = false, CreatedAt = DateTime.UtcNow },
            new() { FirstName = "Enrique",   LastName = "Gil",       Year = 3, Gender = "Male",   Program = bsit, Enrolled = true,  CreatedAt = DateTime.UtcNow },
            new() { FirstName = "Nadine",    LastName = "Lustre",    Year = 2, Gender = "Female", Program = bscs, Enrolled = true,  CreatedAt = DateTime.UtcNow },
            new() { FirstName = "James",     LastName = "Reid",      Year = 4, Gender = "Male",   Program = bsis, Enrolled = true,  CreatedAt = DateTime.UtcNow },
            new() { FirstName = "Bea",       LastName = "Alonzo",    Year = 3, Gender = "Female", Program = bsit, Enrolled = true,  CreatedAt = DateTime.UtcNow },
            new() { FirstName = "John Lloyd",LastName = "Cruz",      Year = 1, Gender = "Male",   Program = bscs, Enrolled = false, CreatedAt = DateTime.UtcNow },
        };

        var studentSections = new List<StudentSection>
        {
            new() { Student = students[0],  Section = sections[0],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[1],  Section = sections[1],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[2],  Section = sections[2],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[3],  Section = sections[3],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[4],  Section = sections[4],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[5],  Section = sections[5],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[6],  Section = sections[6],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[7],  Section = sections[7],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[8],  Section = sections[8],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[9],  Section = sections[9],  EnrolledAt = DateTime.UtcNow },
            new() { Student = students[10], Section = sections[10], EnrolledAt = DateTime.UtcNow },
            new() { Student = students[11], Section = sections[11], EnrolledAt = DateTime.UtcNow },
        };

        var grades = new List<StudentGrade>
        {
            new() { Student = students[0],  Subject = "General Average", Grade = 96m   },
            new() { Student = students[1],  Subject = "General Average", Grade = 91.5m },
            new() { Student = students[2],  Subject = "General Average", Grade = 88.2m },
            new() { Student = students[3],  Subject = "General Average", Grade = 79.4m },
            new() { Student = students[4],  Subject = "General Average", Grade = 94.1m },
            new() { Student = students[5],  Subject = "General Average", Grade = 85.7m },
            new() { Student = students[6],  Subject = "General Average", Grade = 82m   },
            new() { Student = students[7],  Subject = "General Average", Grade = 90.8m },
            new() { Student = students[8],  Subject = "General Average", Grade = 97.3m },
            new() { Student = students[9],  Subject = "General Average", Grade = 84.5m },
            new() { Student = students[10], Subject = "General Average", Grade = 92.6m },
            new() { Student = students[11], Subject = "General Average", Grade = 78.9m },
        };

        return ([bsit, bscs, bsis], sections, students, studentSections, grades);
    }
}
