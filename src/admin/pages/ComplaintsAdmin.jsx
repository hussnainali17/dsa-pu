import { useState } from 'react'
import { useData } from '../store'
import { useAuth } from '../auth'
import Field, { formData, Notice } from '../Field'
import { COMPLAINT_STATUSES } from '../config'
import api from '../../api'

const when = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const pill = (s) => <span className={`adm-pill adm-pill--${s.toLowerCase().replace(' ', '')}`}>{s}</span>

export default function ComplaintsAdmin() {
  const { complaints } = useData()
  const { user } = useAuth()
  const [filter, setFilter] = useState('All')
  const [openId, setOpenId] = useState(null)
  const [detail, setDetail] = useState(null)
  const [msg, setMsg] = useState(null)
  const [saving, setSaving] = useState(false)

  const shown = complaints.filter((c) => filter === 'All' || c.status === filter)

  const openComplaint = async (id) => {
    setOpenId(id)
    setMsg(null)
    setDetail(null)
    try {
      const data = await api.get(`/admin/complaints/${id}`)
      setDetail(data.complaint)
    } catch { setDetail(null) }
  }

  const save = async (e) => {
    e.preventDefault()
    if (!detail) return
    setSaving(true)
    const v = formData(e)
    const status = v.status === 'New' && v.response.trim() ? 'In review' : v.status
    try {
      const data = await api.patch(`/admin/complaints/${detail.id || detail._id}`, { status, response: v.response.trim() })
      setDetail(data.complaint)
      setMsg({ ok: true, text: 'Response saved. The student can see it on the public Complaints page.' })
      // Refresh list
      await api.get('/admin/complaints').then(() => {})
    } catch (err) {
      setMsg({ ok: false, text: err.message })
    } finally { setSaving(false) }
  }

  const c = detail

  return (
    <>
      <h1>Complaints</h1>
      <Field label="Show"><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option>{COMPLAINT_STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
      <h2>{filter === 'All' ? 'All complaints' : filter} ({shown.length})</h2>
      {shown.length === 0 ? <p className="muted">{complaints.length ? 'No complaints with this status.' : 'No complaints have been submitted yet.'}</p> : (
        <div className="adm-table"><table>
          <thead><tr><th>Ref.</th><th>Student</th><th>Department or college</th><th>Type</th><th>Subject</th><th>Sent</th><th>Status</th><th></th></tr></thead>
          <tbody>{shown.map((x) => (
            <tr key={x.id}><td>{x.ref}</td><td>{x.name}<br /><small>{x.regNo}</small></td><td>{x.department}</td><td>{x.category}</td><td>{x.subject}</td><td>{when(x.createdAt)}</td><td>{pill(x.status)}</td>
              <td><button className="adm-ok" onClick={() => openComplaint(x.id || x._id)}>Open and respond</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
      {openId && (
        <div className="adm-case" key={openId}>
          {!c ? <p className="muted">Loading…</p> : (
            <>
              <h2>{c.ref}: {c.subject}</h2>
              <dl className="adm-facts">
                <div><dt>Student</dt><dd>{c.name}, {c.regNo}</dd></div>
                <div><dt>Department or college</dt><dd>{c.department}, {c.programme}, semester {c.semester}</dd></div>
                <div><dt>Contact</dt><dd>{c.phone}<br />{c.email}</dd></div>
                <div><dt>Type</dt><dd>{c.category}</dd></div>
                <div><dt>Incident date</dt><dd>{c.incidentDate ? when(c.incidentDate) : 'Not given'}</dd></div>
                <div><dt>Concerning</dt><dd>{c.against || 'Not given'}</dd></div>
                <div><dt>Submitted</dt><dd>{when(c.createdAt)}</dd></div>
              </dl>
              <p className="adm-quote">{c.details}</p>
              <form className="adm-form" onSubmit={save} key={`${c.status}-${c.respondedAt || ''}`}>
                <h2>Your response</h2>
                <Field label="Status"><select name="status" defaultValue={c.status}>{COMPLAINT_STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
                <Field label="Response to the student" wide><textarea name="response" rows="5" defaultValue={c.response} placeholder="Write the reply the student will see." /></Field>
                <button className="btn btn--gold" disabled={saving}>{saving ? 'Saving…' : 'Save response'}</button>
                <Notice msg={msg} />
                {c.respondedBy && <p className="muted" style={{ maxWidth: 'none' }}>Last answered by {c.respondedBy}{c.respondedAt ? `, ${when(c.respondedAt)}` : ''}.</p>}
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}
