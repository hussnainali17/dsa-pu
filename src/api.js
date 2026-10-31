/**
 * Lightweight fetch wrapper for the DSA API.
 * All requests include credentials (httpOnly cookies).
 */
const BASE = import.meta.env.VITE_API_URL || '/api'

class ApiError extends Error {
  constructor(status, body) {
    const details = body?.details || []
    const detailMessage = details
      .map(({ field, message }) => field ? `${field}: ${message}` : message)
      .join(' ')
    super([body?.error || 'Something went wrong', detailMessage].filter(Boolean).join(' '))
    this.status = status
    this.body = body
    this.details = details
  }
}

async function request(method, path, body) {
  const opts = {
    method,
    credentials: 'include',
    headers: {},
  }
  if (body !== undefined) {
    opts.headers['Content-Type'] = 'application/json'
    opts.body = JSON.stringify(body)
  }
  const res = await fetch(`${BASE}${path}`, opts)
  const data = res.headers.get('content-type')?.includes('json') ? await res.json() : {}
  if (!res.ok) throw new ApiError(res.status, data)
  return data
}

const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  patch: (path, body) => request('PATCH', path, body),
  del: (path) => request('DELETE', path),
}

export default api
export { ApiError }
