import { useState } from "react";
import { createStudent } from "../services/studentService";

const INITIAL_FORM = {
  name: "",
  year: "1",
  gender: "Female",
  status: "Enrolled",
  section: "",
  program: "BSIT",
  grade: "",
};

export default function AddStudent({ onAdd }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    const section = form.section.trim();
    const gradeValue = Number(form.grade);

    if (!name || !section || Number.isNaN(gradeValue)) {
      setError("Please fill out name, section, and grade.");
      return;
    }

    const payload = {
      name,
      year: Number(form.year),
      gender: form.gender,
      enrolled: form.status === "Enrolled",
      section,
      program: form.program,
      grade: gradeValue,
    };

    try {
      setLoading(true);
      const created = await createStudent(payload);
      onAdd(created);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError(err.message || "Failed to create student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Student</h3>
      <input
        placeholder="Full name"
        value={form.name}
        onChange={handleChange("name")}
      />
      <select value={form.program} onChange={handleChange("program")}>
        <option value="BSIT">BSIT</option>
        <option value="BSCS">BSCS</option>
        <option value="BSIS">BSIS</option>
      </select>
      <select value={form.year} onChange={handleChange("year")}>
        <option value="1">Year 1</option>
        <option value="2">Year 2</option>
        <option value="3">Year 3</option>
        <option value="4">Year 4</option>
      </select>
      <select value={form.gender} onChange={handleChange("gender")}>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
      <select value={form.status} onChange={handleChange("status")}>
        <option value="Enrolled">Enrolled</option>
        <option value="Not Enrolled">Not Enrolled</option>
      </select>
      <input
        placeholder="Section (e.g. IT-1A)"
        value={form.section}
        onChange={handleChange("section")}
      />
      <input
        placeholder="Grade"
        type="number"
        step="0.1"
        min="60"
        max="100"
        value={form.grade}
        onChange={handleChange("grade")}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Student"}
      </button>
      {error ? <p>{error}</p> : null}
    </form>
  );
}
