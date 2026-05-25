using Day6.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Day6.Data;

public class StudentEnrollmentContext : IdentityDbContext<ApplicationUser>
{
    public StudentEnrollmentContext() { }
    public StudentEnrollmentContext(DbContextOptions<StudentEnrollmentContext> options) : base(options) { }

    public DbSet<DegreeProgram> Programs => Set<DegreeProgram>();
    public DbSet<Student> Students => Set<Student>();
    public DbSet<Section> Sections => Set<Section>();
    public DbSet<StudentSection> StudentSections => Set<StudentSection>();
    public DbSet<StudentGrade> StudentGrades => Set<StudentGrade>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured)
        {
            return;
        }

        var connectionString = Environment.GetEnvironmentVariable("DAY6_PG_CONN")
            ?? "Host=localhost;Port=5432;Database=new_student_enrollment_db;Username=postgres;Password=sqlraine16";

        optionsBuilder.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<DegreeProgram>(entity =>
        {
            entity.HasIndex(p => p.ProgramName).IsUnique();
        });

        modelBuilder.Entity<Section>(entity =>
        {
            entity.HasIndex(s => s.Code).IsUnique();
            entity.ToTable(t => t.HasCheckConstraint("ck_sections_year", "\"year\" BETWEEN 1 AND 4"));

            entity
                .HasOne(s => s.Program)
                .WithMany(p => p.Sections)
                .HasForeignKey(s => s.ProgramId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.ToTable(t => t.HasCheckConstraint("ck_students_year", "\"year\" BETWEEN 1 AND 4"));

            entity
                .HasOne(s => s.Program)
                .WithMany(p => p.Students)
                .HasForeignKey(s => s.ProgramId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<StudentSection>(entity =>
        {
            entity.HasIndex(ss => new { ss.StudentId, ss.SectionId }).IsUnique();

            entity
                .HasOne(ss => ss.Student)
                .WithMany(s => s.StudentSections)
                .HasForeignKey(ss => ss.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            entity
                .HasOne(ss => ss.Section)
                .WithMany(sec => sec.StudentSections)
                .HasForeignKey(ss => ss.SectionId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<StudentGrade>(entity =>
        {
            entity.ToTable(t => t.HasCheckConstraint("ck_student_grades_grade", "grade BETWEEN 0 AND 100"));

            entity
                .HasOne(g => g.Student)
                .WithMany(s => s.Grades)
                .HasForeignKey(g => g.StudentId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
