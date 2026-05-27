const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001'
const API_URL = import.meta.env.VITE_API_URL || `${API_BASE}/api`

export const requestJson = async (path, options = {}) => {
    const { root, headers, ...requestOptions } = options
    const resolvedPath = path.startsWith("/") ? path : `/${path}`
    const url = root ? `${API_BASE}${resolvedPath}` : `${API_URL}${resolvedPath}`
    const response = await fetch(url, {
        credentials: 'include',
        headers: {
            ...(requestOptions.body ? { 'Content-Type': 'application/json' } : {}),
            ...(headers ?? {}),
        },
        ...requestOptions,
    })

    if (!response.ok) {
        const message = await response.text().catch(() => '')
        throw new Error(message || 'Request failed')
    }

    if (response.status === 204) {
        return null
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) {
        return null
    }

    return response.json()
}