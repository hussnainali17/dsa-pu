import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

export default function Overview() {
  const [stats, setStats] = useState(null)
  const [latestEvents, setLatestEvents] = useState([])

  useEffect(() => {
    api.get('/admin/stats').then((d) => {
      setStats(d.stats)
      setLatestEvents(d.latestEvents || [])
    }).catch(() => {})
  }, [])

  const nums = stats ? [
    ['Events', stats.events],
    ['Students', stats.students],
    ['Event registrations', stats.registrations],
    ['Pending student submissions', (stats.pendingSignups || 0) + (stats.pendingApplications || 0)],
    ['New complaints', stats.newComplaints],
  ] : []

  return (
    <>
      <h1>Overview</h1>
      {stats ? (
        <dl className="adm-stats">{nums.map(([l, n]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}</dl>
      ) : <p className="muted">Loading…</p>}
      <div className="adm-actions">
        <Link className="btn btn--gold" to="/admin/events">Register an event</Link>
        <Link className="btn btn--outline" to="/admin/students">Register a student</Link>
        <Link className="btn btn--outline" to="/admin/registrations">Register a student for an event</Link>
        <Link className="btn btn--outline" to="/admin/submissions">Review student submissions</Link>
        <Link className="btn btn--outline" to="/admin/complaints">Respond to complaints</Link>
      </div>
      <h2>Latest events</h2>
      {latestEvents.length ? (
        <ul className="adm-list">{latestEvents.map((e) => <li key={e.id}><strong>{e.name}</strong><span>{e.start ? new Date(e.start).toLocaleDateString('en-GB') : e.dateLabel || ''}</span></li>)}</ul>
      ) : <p className="muted">No events yet. Register the first one.</p>}
    </>
  )
}
