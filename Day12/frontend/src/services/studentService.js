const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function fetchStudents() {
	const response = await fetch(`${API_BASE_URL}/api/students`);

	if (!response.ok) {
		throw new Error(`Request failed: ${response.status}`);
	}

	return response.json();
}

export async function createStudent(payload) {
	const response = await fetch(`${API_BASE_URL}/api/students`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || `Request failed: ${response.status}`);
	}

	return response.json();
}

export async function updateStudent(id, payload) {
	const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || `Request failed: ${response.status}`);
	}

	return response.json();
}

export async function deleteStudent(id) {
	const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
		method: "DELETE",
		credentials: "include",
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || `Request failed: ${response.status}`);
	}
}
