import { useEffect, useState } from "react";

export default function Stats({ students }) {
    const [stats, setStats] = useState({
        total: 0,
        enrolled: 0,
        programs:0
    });

    useEffect(() => {
        const total = students.length;
        const enrolled = students.filter(student => student.enrolled).length;
        const programs = new Set(students.map(student => student.program)).size;

        setStats({
            total,
            enrolled,
            programs
        });
    }, [students]);

    return (
        <div className="stats-grid">
            <Card title="Total Students" value={stats.total} />
            <Card title="Enrolled Students" value={stats.enrolled} />
            <Card title="Programs" value={stats.programs} />
        </div>
    );
}

function Card({ title, value }) {
    return (
        <div className="stats-card">
            <p>{title}</p>
            <p>{value}</p>
        </div>
    );
}
