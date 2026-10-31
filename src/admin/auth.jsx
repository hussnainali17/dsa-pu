import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'

const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session on mount via the httpOnly cookie
  useEffect(() => {
    api.get('/admin/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (username, password) => {
    const data = await api.post('/admin/auth/login', { username: username.trim(), password })
    setUser(data.user)
  }

  const logout = async () => {
    try { await api.post('/admin/auth/logout') } catch {}
    setUser(null)
  }

  if (loading) return null // Don't flash the login page while checking session

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>
}
