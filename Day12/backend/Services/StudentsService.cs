using Day6.Data;
using Day6.DTOs;
using Day6.Models;
using Microsoft.EntityFrameworkCore;

namespace Day6.Services;

public class StudentsService : IStudentsService
{
    private readonly StudentEnrollmentContext _context;

    public StudentsService(StudentEnrollmentContext context)
    {
        _context = context;
    }

    public List<StudentResponseDto> GetAll()
    {
        return _context.Students
            .AsNoTracking()
            .Include(s => s.Program)
            .Include(s => s.StudentSections).ThenInclude(ss => ss.Section)
            .Include(s => s.Grades)
            .OrderBy(s => s.Id)
            .Select(s => new StudentResponseDto
            {
                Id = s.Id,
                Name = s.FirstName + " " + s.LastName,
                Year = s.Year ?? 0,
                Gender = s.Gender,
                Enrolled = s.Enrolled,
                Section = s.StudentSections.OrderBy(ss => ss.Id).Select(ss => ss.Section.Code).FirstOrDefault() ?? "",
                Program = s.Program != null ? s.Program.ProgramName : "",
                AvgGrade = s.Grades.Any() ? (decimal?)s.Grades.Average(g => g.Grade) : null
            })
            .ToList();
    }

    public StudentResponseDto? GetById(int id)
    {
        return _context.Students
            .AsNoTracking()
            .Include(s => s.Program)
            .Include(s => s.StudentSections).ThenInclude(ss => ss.Section)
            .Include(s => s.Grades)
            .Where(s => s.Id == id)
            .Select(s => new StudentResponseDto
            {
                Id = s.Id,
                Name = s.FirstName + " " + s.LastName,
                Year = s.Year ?? 0,
                Gender = s.Gender,
                Enrolled = s.Enrolled,
                Section = s.StudentSections.OrderBy(ss => ss.Id).Select(ss => ss.Section.Code).FirstOrDefault() ?? "",
                Program = s.Program != null ? s.Program.ProgramName : "",
                AvgGrade = s.Grades.Any() ? s.Grades.Average(g => g.Grade) : null
            })
            .FirstOrDefault();
    }

    public StudentResponseDto Create(CreateStudentDto dto)
    {
        var nameParts = dto.Name.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);

        var program = _context.Programs.FirstOrDefault(p => p.ProgramName == dto.Program)
            ?? _context.Programs.Add(new DegreeProgram { ProgramName = dto.Program }).Entity;

        var section = _context.Sections.FirstOrDefault(s => s.Code == dto.Section)
            ?? _context.Sections.Add(new Section { Code = dto.Section, Year = (int?)dto.Year, Program = program }).Entity;

        var student = new Student
        {
            FirstName = nameParts[0],
            LastName = string.Join(' ', nameParts.Skip(1)),
            Year = (int?)dto.Year,
            Gender = dto.Gender,
            Enrolled = dto.Enrolled,
            Program = program,
            CreatedAt = DateTime.UtcNow
        };

        _context.Students.Add(student);
        _context.StudentSections.Add(new StudentSection { Student = student, Section = section, EnrolledAt = DateTime.UtcNow });
        _context.StudentGrades.Add(new StudentGrade { Student = student, Subject = "General Average", Grade = dto.Grade });

        _context.SaveChanges();

        return new StudentResponseDto
        {
            Id = student.Id,
            Name = student.FirstName + " " + student.LastName,
            Year = student.Year ?? 0,
            Gender = student.Gender,
            Enrolled = student.Enrolled,
            Section = section.Code,
            Program = program.ProgramName,
            AvgGrade = dto.Grade
        };
    }

    public StudentResponseDto? Update(int id, UpdateStudentDto dto)
    {
        var student = _context.Students
            .Include(s => s.Program)
            .Include(s => s.StudentSections).ThenInclude(ss => ss.Section)
            .Include(s => s.Grades)
            .FirstOrDefault(s => s.Id == id);

        if (student == null) return null;

        var nameParts = dto.Name.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);

        var program = _context.Programs.FirstOrDefault(p => p.ProgramName == dto.Program)
            ?? _context.Programs.Add(new DegreeProgram { ProgramName = dto.Program }).Entity;

        var section = _context.Sections.FirstOrDefault(s => s.Code == dto.Section);
        if (section == null)
        {
            section = _context.Sections.Add(new Section { Code = dto.Section, Year = (int?)dto.Year, Program = program }).Entity;
        }
        else
        {
            section.Year = (int?)dto.Year;
            section.Program = program;
        }

        student.FirstName = nameParts[0];
        student.LastName = string.Join(' ', nameParts.Skip(1));
        student.Year = (int?)dto.Year;
        student.Gender = dto.Gender;
        student.Enrolled = dto.Enrolled;
        student.Program = program;

        var studentSection = student.StudentSections.OrderBy(ss => ss.Id).FirstOrDefault();
        if (studentSection == null)
            _context.StudentSections.Add(new StudentSection { Student = student, Section = section, EnrolledAt = DateTime.UtcNow });
        else
            studentSection.Section = section;

        var grade = student.Grades.OrderBy(g => g.Id).FirstOrDefault();
        if (grade == null)
            _context.StudentGrades.Add(new StudentGrade { Student = student, Subject = "General Average", Grade = dto.Grade });
        else
            grade.Grade = dto.Grade;

        _context.SaveChanges();

        return new StudentResponseDto
        {
            Id = student.Id,
            Name = student.FirstName + " " + student.LastName,
            Year = student.Year ?? 0,
            Gender = student.Gender,
            Enrolled = student.Enrolled,
            Section = section.Code,
            Program = program.ProgramName,
            AvgGrade = dto.Grade
        };
    }

    public bool Delete(int id)
    {
        var student = _context.Students.FirstOrDefault(s => s.Id == id);
        if (student == null) return false;

        _context.Students.Remove(student);
        _context.SaveChanges();
        return true;
    }
}
