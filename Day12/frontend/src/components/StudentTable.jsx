import { useState } from "react";

export default function StudentTable({ students, onUpdateStudent, onDeleteStudent }) {
    const [editingId, setEditingId] = useState(null);
    const [draft, setDraft] = useState(null);

    const startEdit = (student) => {
        setEditingId(student.id);
        setDraft({
            name: student.name || "",
            year: String(student.year ?? 1),
            gender: student.gender || "Female",
            status: student.enrolled ? "Enrolled" : "Not Enrolled",
            section: student.section || "",
            program: student.program || "BSIT",
            grade: student.avgGrade ?? "",
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setDraft(null);
    };

    const handleDraftChange = (field) => (event) => {
        setDraft((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const saveEdit = (studentId) => {
        if (!draft) {
            return;
        }

        const name = draft.name.trim();
        const section = draft.section.trim();
        const gradeValue = Number(draft.grade);

        if (!name || !section || Number.isNaN(gradeValue)) {
            return;
        }

        onUpdateStudent(studentId, {
            name,
            year: Number(draft.year),
            gender: draft.gender,
            enrolled: draft.status === "Enrolled",
            section,
            program: draft.program,
            grade: gradeValue,
        });

        cancelEdit();
    };

    return (
        <div className="table-wrapper">
            <div className="table-container">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Year</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Section</th>
                            <th>Program</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, index) => (
                            <tr key={s.id} className={index % 2 === 0 ? "table-row table-row-striped" : "table-row"}>
                                {editingId === s.id ? (
                                    <>
                                        <td>
                                            <input value={draft?.name ?? ""} onChange={handleDraftChange("name")} />
                                        </td>
                                        <td>
                                            <select value={draft?.year ?? "1"} onChange={handleDraftChange("year")}>
                                                <option value="1">Year 1</option>
                                                <option value="2">Year 2</option>
                                                <option value="3">Year 3</option>
                                                <option value="4">Year 4</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select value={draft?.gender ?? "Female"} onChange={handleDraftChange("gender")}>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select value={draft?.status ?? "Enrolled"} onChange={handleDraftChange("status")}>
                                                <option value="Enrolled">Enrolled</option>
                                                <option value="Not Enrolled">Not Enrolled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input value={draft?.section ?? ""} onChange={handleDraftChange("section")} />
                                        </td>
                                        <td>
                                            <select value={draft?.program ?? "BSIT"} onChange={handleDraftChange("program")}>
                                                <option value="BSIT">BSIT</option>
                                                <option value="BSCS">BSCS</option>
                                                <option value="BSIS">BSIS</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="100"
                                                value={draft?.grade ?? ""}
                                                onChange={handleDraftChange("grade")}
                                            />
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => saveEdit(s.id)}>Save</button>
                                            <button type="button" onClick={cancelEdit}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="cell-bold">{s.name}</td>
                                        <td className="cell-muted">{s.year}</td>
                                        <td className="cell-muted">{s.gender}</td>
                                        <td className={s.enrolled ? "cell-bold" : "cell-muted"}>
                                            {s.enrolled ? "Enrolled" : "Not Enrolled"}
                                        </td>
                                        <td className="cell-muted">{s.section}</td>
                                        <td className="cell-muted">{s.program}</td>
                                        <td className="cell-muted">{s.avgGrade}</td>
                                        <td>
                                            <button type="button" onClick={() => startEdit(s)}>Update</button>
                                            <button type="button" onClick={() => onDeleteStudent(s.id)}>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}