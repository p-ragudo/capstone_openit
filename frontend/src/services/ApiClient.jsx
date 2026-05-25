const API_BASE = 'http://localhost:5000'
const API_URL = 'http://localhost:5000/api'

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