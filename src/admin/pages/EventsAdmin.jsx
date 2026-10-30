import { useState } from 'react'
import { useData } from '../store'
import Field, { formData, Notice } from '../Field'
import { LEVELS } from '../config'
import { societies } from '../../data/content'

export default function EventsAdmin() {
  const { events, registrations, addEvent, removeEvent } = useData()
  const [msg, setMsg] = useState(null)
  const submit = (e) => {
    e.preventDefault()
    const v = formData(e)
    if (v.end < v.start) return setMsg({ ok: false, text: 'The end date cannot be before the start date.' })
    addEvent(v); e.currentTarget.reset(); setMsg({ ok: true, text: `${v.name} registered.` })
  }
  return (
    <>
      <h1>Events</h1>
      <form className="adm-form" onSubmit={submit}>
        <h2>Register an event</h2>
        <Field label="Event name" wide><input name="name" required /></Field>
        <Field label="Society"><select name="society"><option>DSA</option>{societies.map((s) => <option key={s.slug}>{s.name}</option>)}</select></Field>
        <Field label="Level"><select name="level">{LEVELS.map((l) => <option key={l}>{l}</option>)}</select></Field>
        <Field label="Start date"><input type="date" name="start" required /></Field>
        <Field label="End date"><input type="date" name="end" required /></Field>
        <Field label="Venue or host institution" wide><input name="venue" required /></Field>
        <button className="btn btn--gold">Register event</button>
        <Notice msg={msg} />
      </form>
      <h2>Registered events</h2>
      {events.length === 0 ? <p className="muted">No events yet. Use the form above to add one.</p> : (
        <div className="adm-table"><table>
          <thead><tr><th>Event</th><th>Society</th><th>Level</th><th>Dates</th><th>Venue</th><th>Students</th><th></th></tr></thead>
          <tbody>{events.map((ev) => (
            <tr key={ev.id}><td>{ev.name}</td><td>{ev.society}</td><td>{ev.level}</td><td>{ev.start} to {ev.end}</td><td>{ev.venue}</td>
              <td>{registrations.filter((r) => r.eventId === ev.id).length}</td>
              <td><button className="adm-del" onClick={() => confirm(`Delete ${ev.name} and its registrations?`) && removeEvent(ev.id)}>Delete</button></td></tr>
          ))}</tbody></table></div>
      )}
    </>
  )
}
