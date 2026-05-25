using Day6.Data;
using Day6.DTOs;
using Day6.Models;
using Day6.Services;
using Microsoft.EntityFrameworkCore;

namespace Day9WebApi.Tests;

public class StudentsServiceTests
{
    // Creates a fresh in-memory database for each test so they don't interfere
    private StudentEnrollmentContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<StudentEnrollmentContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new StudentEnrollmentContext(options);
    }

    // Seeds one complete student record (program + section + student + enrollment + grade)
    private void SeedStudent(StudentEnrollmentContext context, string name = "Juan Dela Cruz", int year = 2)
    {
        var program = new DegreeProgram { ProgramName = "BSIT" };
        var section = new Section { Code = "IT-2A", Year = year, Program = program };
        var nameParts = name.Split(' ');
        var student = new Student
        {
            FirstName = nameParts[0],
            LastName = string.Join(' ', nameParts.Skip(1)),
            Year = year,
            Gender = "Male",
            Enrolled = true,
            Program = program,
            CreatedAt = DateTime.UtcNow
        };

        context.Programs.Add(program);
        context.Sections.Add(section);
        context.Students.Add(student);
        context.StudentSections.Add(new StudentSection { Student = student, Section = section, EnrolledAt = DateTime.UtcNow });
        context.StudentGrades.Add(new StudentGrade { Student = student, Subject = "General Average", Grade = 88 });
        context.SaveChanges();
    }

    // -----------------------------------------------------------------------
    // 1. GetAll — returns every student
    // -----------------------------------------------------------------------
    [Fact]
    public void GetAll_ReturnsAllStudents()
    {
        using var context = CreateContext();
        SeedStudent(context, "Juan Dela Cruz", 2);
        SeedStudent(context, "Maria Santos", 3);

        var service = new StudentsService(context);
        var result = service.GetAll();

        Assert.Equal(2, result.Count);
        Assert.Contains(result, s => s.Name == "Juan Dela Cruz");
        Assert.Contains(result, s => s.Name == "Maria Santos");
    }

    // -----------------------------------------------------------------------
    // 2. GetById — returns the right student when found, null when not found
    // -----------------------------------------------------------------------
    [Fact]
    public void GetById_ReturnsStudent_WhenExists()
    {
        using var context = CreateContext();
        SeedStudent(context, "Juan Dela Cruz", 2);
        var savedId = context.Students.First().Id;

        var service = new StudentsService(context);
        var result = service.GetById(savedId);

        Assert.NotNull(result);
        Assert.Equal("Juan Dela Cruz", result.Name);
        Assert.Equal(2, result.Year);
    }

    [Fact]
    public void GetById_ReturnsNull_WhenNotFound()
    {
        using var context = CreateContext();

        var service = new StudentsService(context);
        var result = service.GetById(9999);

        Assert.Null(result);
    }

    // -----------------------------------------------------------------------
    // 3. Create — saves student to the database and returns correct DTO
    // -----------------------------------------------------------------------
    [Fact]
    public void Create_SavesStudentAndReturnsDto()
    {
        using var context = CreateContext();

        var service = new StudentsService(context);
        var dto = new CreateStudentDto
        {
            Name = "Pedro Reyes",
            Year = 1,
            Gender = "Male",
            Enrolled = true,
            Section = "IT-1A",
            Program = "BSCS",
            Grade = 90
        };

        var result = service.Create(dto);

        Assert.NotNull(result);
        Assert.Equal("Pedro Reyes", result.Name);
        Assert.Equal("BSCS", result.Program);
        Assert.Equal("IT-1A", result.Section);
        Assert.Equal(90, result.AvgGrade);
        Assert.Equal(1, context.Students.Count());
    }

    // -----------------------------------------------------------------------
    // 4. Update — modifies the student and returns updated DTO; null if missing
    // -----------------------------------------------------------------------
    [Fact]
    public void Update_ChangesStudentData_WhenExists()
    {
        using var context = CreateContext();
        SeedStudent(context, "Juan Dela Cruz", 2);
        var id = context.Students.First().Id;

        var service = new StudentsService(context);
        var dto = new UpdateStudentDto
        {
            Name = "Juan Updated",
            Year = 3,
            Gender = "Male",
            Enrolled = false,
            Section = "IT-3B",
            Program = "BSIT",
            Grade = 95
        };

        var result = service.Update(id, dto);

        Assert.NotNull(result);
        Assert.Equal("Juan Updated", result.Name);
        Assert.Equal(3, result.Year);
        Assert.False(result.Enrolled);
        Assert.Equal(95, result.AvgGrade);
    }

    [Fact]
    public void Update_ReturnsNull_WhenStudentNotFound()
    {
        using var context = CreateContext();

        var service = new StudentsService(context);
        var dto = new UpdateStudentDto
        {
            Name = "Nobody Here",
            Year = 1,
            Gender = "Male",
            Enrolled = true,
            Section = "IT-1A",
            Program = "BSIT",
            Grade = 75
        };

        var result = service.Update(9999, dto);

        Assert.Null(result);
    }

    // -----------------------------------------------------------------------
    // 5. Delete — removes student and returns true; false if not found
    // -----------------------------------------------------------------------
    [Fact]
    public void Delete_RemovesStudent_AndReturnsTrue()
    {
        using var context = CreateContext();
        SeedStudent(context, "Juan Dela Cruz", 2);
        var id = context.Students.First().Id;

        var service = new StudentsService(context);
        var result = service.Delete(id);

        Assert.True(result);
        Assert.Equal(0, context.Students.Count());
    }

    [Fact]
    public void Delete_ReturnsFalse_WhenStudentNotFound()
    {
        using var context = CreateContext();

        var service = new StudentsService(context);
        var result = service.Delete(9999);

        Assert.False(result);
    }
}
