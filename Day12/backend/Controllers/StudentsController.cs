using Day6.DTOs;
using Day6.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Day6.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly IStudentsService _studentsService;

    public StudentsController(IStudentsService studentsService)
    {
        _studentsService = studentsService;
    }

    // GET /api/students
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_studentsService.GetAll());
    }

    // GET /api/students/5
    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var student = _studentsService.GetById(id);
        return student == null ? NotFound() : Ok(student);
    }

    // POST /api/students
    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] CreateStudentDto dto)
    {
        var created = _studentsService.Create(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    // PUT /api/students/5
    [Authorize]
    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] UpdateStudentDto dto)
    {
        var updated = _studentsService.Update(id, dto);
        return updated == null ? NotFound() : Ok(updated);
    }

    // DELETE /api/students/5
    [Authorize]
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        return _studentsService.Delete(id) ? NoContent() : NotFound();
    }
}
