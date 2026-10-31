import { useData } from '../store'

const when = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

function Actions({ list, row }) {
  const { setStatus, removeSubmission, approveSignup } = useData()
  return (
    <td className="adm-row-actions">
      {list === 'eventSignups' && row.status !== 'Approved' && (
        <button className="adm-ok" onClick={() => approveSignup(row.id)}>Approve &amp; add to event</button>
      )}
      {list !== 'eventSignups' && row.status !== 'Approved' && (
        <button className="adm-ok" onClick={() => setStatus(list, row.id, 'Approved')}>Approve</button>
      )}
      {row.status !== 'Declined' && <button className="adm-del" onClick={() => setStatus(list, row.id, 'Declined')}>Decline</button>}
      <button className="adm-del" onClick={() => window.confirm(`Delete the submission from ${row.name}?`) && removeSubmission(list, row.id)}>Delete</button>
    </td>
  )
}

const Status = ({ s }) => <span className={`adm-pill adm-pill--${s.toLowerCase()}`}>{s}</span>

export default function SubmissionsAdmin() {
  const { eventSignups, societyApplications } = useData()
  return (
    <>
      <h1>Student submissions</h1>
      <p className="muted" style={{ marginBottom: '1rem', maxWidth: 'none' }}>Forms students send from the public site. Approve or decline each one.</p>
      <h2>Event registrations ({eventSignups.length})</h2>
      {eventSignups.length === 0 ? <p className="muted">No students have registered for events yet.</p> : (
        <div className="adm-table"><table>
          <thead><tr><th>Student</th><th>Reg. no.</th><th>Department</th><th>Event</th><th>Role</th><th>Contact</th><th>Sent</th><th>Status</th><th></th></tr></thead>
          <tbody>{eventSignups.map((r) => (
            <tr key={r.id}><td>{r.name}</td><td>{r.regNo}</td><td>{r.department}, {r.programme} sem. {r.semester}</td><td>{r.eventName}{r.category ? ` (${r.category})` : ''}</td><td>{r.role}</td><td>{r.email}<br />{r.phone}</td><td>{when(r.createdAt)}</td><td><Status s={r.status} /></td><Actions list="eventSignups" row={r} />
            </tr>
          ))}</tbody>
        </table></div>
      )}
      <h2>Society applications ({societyApplications.length})</h2>
      {societyApplications.length === 0 ? <p className="muted">No students have applied to societies yet.</p> : (
        <div className="adm-table"><table>
          <thead><tr><th>Student</th><th>Reg. no.</th><th>Department</th><th>Society</th><th>Applying as</th><th>Contact</th><th>Sent</th><th>Status</th><th></th></tr></thead>
          <tbody>{societyApplications.map((r) => (
            <tr key={r.id}><td>{r.name}</td><td>{r.regNo}</td><td>{r.department}, {r.programme} sem. {r.semester}</td><td>{r.societyName}</td><td>{r.applyingAs}{r.position ? `: ${r.position}` : ''}{r.experience ? <><br /><small>{r.experience}</small></> : null}</td><td>{r.email}<br />{r.phone}</td><td>{when(r.createdAt)}</td><td><Status s={r.status} /></td><Actions list="societyApplications" row={r} />
            </tr>
          ))}</tbody>
        </table></div>
      )}
    </>
  )
}
