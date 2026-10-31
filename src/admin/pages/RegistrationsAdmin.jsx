import { useState } from 'react'
import { useData } from '../store'
import Field, { formData, Notice } from '../Field'
import { ROLES } from '../config'

export default function RegistrationsAdmin() {
  const { events, students, registrations, register, unregister } = useData()
  const [eventId, setEventId] = useState('')
  const [msg, setMsg] = useState(null)
  const ev = events.find((e) => e.id === eventId)
  const rows = registrations.filter((r) => (r.event?.id || r.event?._id || r.event) === eventId)
  const registeredStudentIds = new Set(rows.map((r) => r.student?.id || r.student?._id || r.student))
  const free = students.filter((s) => !registeredStudentIds.has(s.id))

  const submit = async (e) => {
    e.preventDefault()
    const v = formData(e)
    const r = await register(eventId, v.studentId, v.role, v.category)
    if (r.ok) e.currentTarget.reset()
    setMsg({ ok: r.ok, text: r.ok ? 'Student registered for the event.' : r.error })
  }

  return (
    <>
      <h1>Event registrations</h1>
      {events.length === 0 || students.length === 0 ? (
        <p className="muted">Register at least one event and one student first.</p>
      ) : (
        <>
          <Field label="Event"><select value={eventId} onChange={(e) => { setEventId(e.target.value); setMsg(null) }}>
            <option value="">Choose an event</option>{events.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select></Field>
          {ev && (
            <>
              <form className="adm-form" onSubmit={submit}>
                <h2>Register a student for {ev.name}</h2>
                <Field label="Student"><select name="studentId" required>
                  <option value="">Choose a student</option>{free.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.regNo})</option>)}
                </select></Field>
                <Field label="Role"><select name="role">{ROLES.map((r) => <option key={r}>{r}</option>)}</select></Field>
                <Field label="Competition category (optional)" wide><input name="category" /></Field>
                <button className="btn btn--gold" disabled={!free.length}>Register student</button>
                {!free.length && <p className="muted">Every registered student is already in this event.</p>}
                <Notice msg={msg} />
              </form>
              <h2>Students in this event ({rows.length})</h2>
              {rows.length === 0 ? <p className="muted">No students registered for this event yet.</p> : (
                <div className="adm-table"><table>
                  <thead><tr><th>Name</th><th>Reg. no.</th><th>Department</th><th>Role</th><th>Category</th><th></th></tr></thead>
                  <tbody>{rows.map((r) => {
                    const s = r.student && typeof r.student === 'object' ? r.student : students.find((x) => x.id === (r.student?.id || r.student?._id || r.student))
                    return (
                      <tr key={r.id}><td>{s?.name}</td><td>{s?.regNo}</td><td>{s?.department}</td><td>{r.role}</td><td>{r.category || 'None'}</td>
                        <td><button className="adm-del" onClick={() => unregister(r.id)}>Remove</button></td>
                      </tr>
                    )
                  })}</tbody>
                </table></div>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
