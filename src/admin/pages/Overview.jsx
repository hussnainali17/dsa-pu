import { Link } from 'react-router-dom'
import { useData } from '../store'

export default function Overview() {
  const { events, students, registrations, eventSignups, societyApplications, complaints } = useData()
  const pending = [...eventSignups, ...societyApplications].filter((x) => x.status === 'Pending').length
  const nums = [['Events', events.length], ['Students', students.length], ['Event registrations', registrations.length], ['Pending student submissions', pending], ['New complaints', complaints.filter((c) => c.status === 'New').length]]
  return (
    <>
      <h1>Overview</h1>
      <dl className="adm-stats">{nums.map(([l, n]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}</dl>
      <div className="adm-actions">
        <Link className="btn btn--gold" to="/admin/events">Register an event</Link>
        <Link className="btn btn--outline" to="/admin/students">Register a student</Link>
        <Link className="btn btn--outline" to="/admin/registrations">Register a student for an event</Link>
        <Link className="btn btn--outline" to="/admin/submissions">Review student submissions</Link>
        <Link className="btn btn--outline" to="/admin/complaints">Respond to complaints</Link>
      </div>
      <h2>Latest events</h2>
      {events.length ? <ul className="adm-list">{events.slice(0, 5).map((e) => <li key={e.id}><strong>{e.name}</strong><span>{e.start}</span></li>)}</ul>
        : <p className="muted">No events yet. Register the first one.</p>}
    </>
  )
}
