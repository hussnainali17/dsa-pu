import { createContext, useContext, useState } from 'react'
import { ADMIN_USERS } from './config'

const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)
const KEY = 'dsa-admin-session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(sessionStorage.getItem(KEY)) } catch { return null } })
  // Swap this body for a real API request later.
  const login = async (username, password) => {
    const u = ADMIN_USERS.find((x) => x.username === username.trim() && x.password === password)
    if (!u) throw new Error('Username or password is incorrect.')
    const session = { username: u.username, name: u.name }
    try { sessionStorage.setItem(KEY, JSON.stringify(session)) } catch {}
    setUser(session)
  }
  const logout = () => { try { sessionStorage.removeItem(KEY) } catch {}; setUser(null) }
  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>
}
