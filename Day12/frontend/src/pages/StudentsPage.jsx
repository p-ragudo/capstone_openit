import { useStudents } from '../hooks/useStudents';
import AddStudent from '../components/AddStudent';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';
import StudentTable from '../components/StudentTable';

export default function StudentsPage() {
  const {
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
  } = useStudents();

  return (
    <div className="app-container">
      <Navbar />
      <Stats students={students} />

      <AddStudent onAdd={handleStudentAdded} />

      <Filters
        search={search}
        setSearch={setSearch}
        program={program}
        setProgram={setProgram}
        year={year}
        setYear={setYear}
      />

      {actionError ? <p>{actionError}</p> : null}

      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <StudentTable
          students={filtered}
          onUpdateStudent={handleUpdateStudent}
          onDeleteStudent={handleDeleteStudent}
        />
      )}

      <Footer />
    </div>
  );
}
