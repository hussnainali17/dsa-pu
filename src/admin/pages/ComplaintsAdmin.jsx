import { useState } from 'react'
import { useData } from '../store'
import { useAuth } from '../auth'
import Field, { formData, Notice } from '../Field'
import { COMPLAINT_STATUSES } from '../config'

const when = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const pill = (s) => <span className={`adm-pill adm-pill--${s.toLowerCase().replace(' ', '')}`}>{s}</span>

export default function ComplaintsAdmin() {
  const { complaints, respondComplaint } = useData()
  const { user } = useAuth()
  const [filter, setFilter] = useState('All')
  const [openId, setOpenId] = useState(null)
  const [msg, setMsg] = useState(null)
  const shown = complaints.filter((c) => filter === 'All' || c.status === filter)
  const c = complaints.find((x) => x.id === openId)

  const save = (e) => {
    e.preventDefault()
    const v = formData(e)
    const status = v.status === 'New' && v.response.trim() ? 'In review' : v.status
    respondComplaint(c.id, status, v.response.trim(), user.name)
    setMsg({ ok: true, text: 'Response saved. The student can see it on the public Complaints page.' })
  }

  return (
    <>
      <h1>Complaints</h1>
      <Field label="Show"><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option>{COMPLAINT_STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
      <h2>{filter === 'All' ? 'All complaints' : filter} ({shown.length})</h2>
      {shown.length === 0 ? <p className="muted">{complaints.length ? 'No complaints with this status.' : 'No complaints have been submitted yet.'}</p> : (
        <div className="adm-table"><table>
          <thead><tr><th>Ref.</th><th>Student</th><th>Department or college</th><th>Type</th><th>Subject</th><th>Sent</th><th>Status</th><th></th></tr></thead>
          <tbody>{shown.map((x) => (
            <tr key={x.id}><td>{x.ref}</td><td>{x.name}<br /><small>{x.regNo}</small></td><td>{x.department}</td><td>{x.category}</td><td>{x.subject}</td><td>{when(x.at)}</td><td>{pill(x.status)}</td>
              <td><button className="adm-ok" onClick={() => { setOpenId(x.id); setMsg(null) }}>Open and respond</button></td></tr>
          ))}</tbody></table></div>
      )}
      {c && (
        <div className="adm-case" key={c.id}>
          <h2>{c.ref}: {c.subject}</h2>
          <dl className="adm-facts">
            <div><dt>Student</dt><dd>{c.name}, {c.regNo}</dd></div>
            <div><dt>Department or college</dt><dd>{c.department}, {c.programme}, semester {c.semester}</dd></div>
            <div><dt>Contact</dt><dd>{c.phone}<br />{c.email}</dd></div>
            <div><dt>Type</dt><dd>{c.category}</dd></div>
            <div><dt>Incident date</dt><dd>{c.incidentDate ? when(c.incidentDate) : 'Not given'}</dd></div>
            <div><dt>Concerning</dt><dd>{c.against || 'Not given'}</dd></div>
            <div><dt>Submitted</dt><dd>{when(c.at)}</dd></div>
          </dl>
          <p className="adm-quote">{c.details}</p>
          <form className="adm-form" onSubmit={save} key={`${c.status}-${c.respondedAt || ''}`}>
            <h2>Your response</h2>
            <Field label="Status"><select name="status" defaultValue={c.status}>{COMPLAINT_STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Response to the student" wide><textarea name="response" rows="5" defaultValue={c.response} placeholder="Write the reply the student will see." /></Field>
            <button className="btn btn--gold">Save response</button>
            <Notice msg={msg} />
            {c.respondedBy && <p className="muted" style={{ maxWidth: 'none' }}>Last answered by {c.respondedBy}{c.respondedAt ? `, ${when(c.respondedAt)}` : ''}.</p>}
          </form>
        </div>
      )}
    </>
  )
}
