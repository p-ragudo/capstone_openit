using Day6.DTOs;

namespace Day6.Services;

public interface IStudentsService
{
    List<StudentResponseDto> GetAll();
    StudentResponseDto? GetById(int id);
    StudentResponseDto Create(CreateStudentDto dto);
    StudentResponseDto? Update(int id, UpdateStudentDto dto);
    bool Delete(int id);
}
