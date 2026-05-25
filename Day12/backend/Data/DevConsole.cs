using Day6.Models;
using Microsoft.EntityFrameworkCore;

namespace Day6.Data;

public static class DevConsole
{
    public static void RetrieveStudentEnrollmentData()
    {
        using var context = new StudentEnrollmentContext();
        context.Database.Migrate();

        var students = context.Students
            .AsNoTracking()
            .Include(s => s.Program)
            .Include(s => s.StudentSections)
                .ThenInclude(ss => ss.Section)
            .Include(s => s.Grades)
            .OrderBy(s => s.Id)
            .ToList();

        if (students.Count == 0)
        {
            Console.WriteLine("No students found. Seed the database first.");
            return;
        }

        Console.WriteLine("\nName\tYear\tGender\tStatus\tSection\tProgram\tGrade");

        foreach (var s in students)
        {
            var programName = s.Program?.ProgramName ?? "";
            var sectionText = s.StudentSections.FirstOrDefault()?.Section.Code ?? "";
            var status = s.Enrolled ? "Enrolled" : "Not Enrolled";
            var grade = s.Grades.FirstOrDefault()?.Grade.ToString() ?? "";

            Console.WriteLine($"{s.FirstName} {s.LastName}\t{s.Year}\t{s.Gender}\t{status}\t{sectionText}\t{programName}\t{grade}");
        }

        Console.WriteLine("\nGenerated SQL preview (EF Core):");
        Console.WriteLine(
            context.Students
                .Include(s => s.Program)
                .Include(s => s.StudentSections)
                    .ThenInclude(ss => ss.Section)
                .Include(s => s.Grades)
                .ToQueryString()
        );
    }

    public static void DeleteStudentById()
    {
        using var context = new StudentEnrollmentContext();
        context.Database.Migrate();

        var students = context.Students
            .AsNoTracking()
            .OrderBy(s => s.LastName)
            .ThenBy(s => s.FirstName)
            .Select(s => new { s.Id, s.FirstName, s.LastName })
            .ToList();

        if (students.Count == 0)
        {
            Console.WriteLine("No students found. Seed the database first.");
            return;
        }

        Console.WriteLine("\nStudents:");
        foreach (var s in students)
        {
            Console.WriteLine($"{s.Id}: {s.FirstName} {s.LastName}");
        }

        Console.Write("\nEnter Student ID to delete: ");
        var input = Console.ReadLine()?.Trim();

        if (!int.TryParse(input, out var studentId))
        {
            Console.WriteLine("Invalid ID.");
            return;
        }

        var student = context.Students.FirstOrDefault(s => s.Id == studentId);

        if (student is null)
        {
            Console.WriteLine("Student not found.");
            return;
        }

        Console.Write($"Delete {student.FirstName} {student.LastName}? (y/n): ");
        var confirm = Console.ReadLine()?.Trim();

        if (!string.Equals(confirm, "y", StringComparison.OrdinalIgnoreCase))
        {
            Console.WriteLine("Delete cancelled.");
            return;
        }

        context.Students.Remove(student);
        context.SaveChanges();

        Console.WriteLine("Student deleted.");
    }
}
