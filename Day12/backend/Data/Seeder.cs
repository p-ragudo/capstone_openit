using Microsoft.EntityFrameworkCore;

namespace Day6.Data;

public static class Seeder
{
    private static void EnsureDatabaseUpToDate(StudentEnrollmentContext context)
    {
        context.Database.Migrate();
    }

    private static void ClearAllData(StudentEnrollmentContext context)
    {
        context.Database.ExecuteSqlRaw(
            "TRUNCATE TABLE student_grades, student_sections, students, sections, programs RESTART IDENTITY CASCADE;"
        );
    }

    private static bool HasAnyData(StudentEnrollmentContext context)
    {
        return
            context.Programs.AsNoTracking().Any() ||
            context.Sections.AsNoTracking().Any() ||
            context.Students.AsNoTracking().Any() ||
            context.StudentSections.AsNoTracking().Any() ||
            context.StudentGrades.AsNoTracking().Any();
    }

    private static void SeedCore(StudentEnrollmentContext context, bool log)
    {
        var (programs, sections, students, studentSections, grades) = SeedFixtures.Build();

        context.Programs.AddRange(programs);
        context.Sections.AddRange(sections);
        context.Students.AddRange(students);
        context.StudentSections.AddRange(studentSections);
        context.StudentGrades.AddRange(grades);

        try
        {
            context.SaveChanges();
        }
        catch (DbUpdateException ex)
        {
            if (log)
            {
                Console.WriteLine("Seed failed while saving changes.");
                Console.WriteLine(ex.InnerException?.Message ?? ex.Message);
            }

            throw;
        }

        if (log)
        {
            Console.WriteLine("Seed complete.");
            Console.WriteLine($"Programs: {context.Programs.Count()}");
            Console.WriteLine($"Sections: {context.Sections.Count()}");
            Console.WriteLine($"Students: {context.Students.Count()}");
            Console.WriteLine($"StudentSections: {context.StudentSections.Count()}");
            Console.WriteLine($"StudentGrades: {context.StudentGrades.Count()}");
        }
    }

    public static void EnsureSeeded()
    {
        using var context = new StudentEnrollmentContext();
        EnsureDatabaseUpToDate(context);

        if (HasAnyData(context))
        {
            return;
        }

        SeedCore(context, log: false);
    }

    public static void SeedData()
    {
        using var context = new StudentEnrollmentContext();
        EnsureDatabaseUpToDate(context);

        if (HasAnyData(context))
        {
            Console.WriteLine("Database already has data.");
            Console.Write("Reseed? This will DELETE existing data (y/n): ");
            var confirm = Console.ReadLine()?.Trim();

            if (!string.Equals(confirm, "y", StringComparison.OrdinalIgnoreCase))
            {
                Console.WriteLine("Seed cancelled.");
                return;
            }

            ClearAllData(context);
        }

        try
        {
            SeedCore(context, log: true);
        }
        catch (DbUpdateException)
        {
            return;
        }
    }
}
