import { useEffect } from 'react'
import { useAuth } from './auth'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'

// Shows the sign-in page until an admin is authenticated, then the dashboard.
export default function AdminShell() {
  const { user } = useAuth()
  useEffect(() => { document.title = 'DSA Admin'; return () => { document.title = 'Directorate of Students Affairs | University of the Punjab' } }, [])
  return user ? <AdminLayout /> : <AdminLogin />
}
