import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from './auth'

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/students', label: 'Students' },
  { to: '/admin/registrations', label: 'Event registrations' },
  { to: '/admin/submissions', label: 'Student submissions' },
  { to: '/admin/complaints', label: 'Complaints' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-brand"><img src="/logo.png" alt="" width="40" height="40" /><span>DSA Admin<small>University of the Punjab</small></span></div>
        <nav>{links.map((l) => <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>)}</nav>
        <div className="adm-user"><span>{user.name}</span><button onClick={logout}>Sign out</button></div>
      </aside>
      <main className="adm-main"><Outlet /></main>
    </div>
  )
}
