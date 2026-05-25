import { createContext, useEffect, useState } from 'react';
import { deleteStudent, fetchStudents, updateStudent } from '../services/studentService';

export const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("All");
  const [year, setYear] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchStudents()
      .then((data) => {
        if (isMounted) setStudents(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Failed to load students.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchProgram = program === "All" || s.program === program;
    const matchYear = year === "All" || s.year === parseInt(year);
    return matchSearch && matchProgram && matchYear;
  });

  const handleStudentAdded = (created) => {
    setStudents((prev) => [...prev, created]);
  };

  const handleUpdateStudent = async (studentId, payload) => {
    setActionError("");
    try {
      const updated = await updateStudent(studentId, payload);
      setStudents((prev) => prev.map((s) => (s.id === studentId ? updated : s)));
    } catch (err) {
      setActionError(err.message || "Failed to update student.");
    }
  };

  const handleDeleteStudent = async (studentId) => {
    const confirmed = window.confirm("Delete this student?");
    if (!confirmed) return;

    setActionError("");
    try {
      await deleteStudent(studentId);
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
    } catch (err) {
      setActionError(err.message || "Failed to delete student.");
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        filtered,
        search,
        setSearch,
        program,
        setProgram,
        year,
        setYear,
        loading,
        error,
        actionError,
        handleStudentAdded,
        handleUpdateStudent,
        handleDeleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
