import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import StudentFields from './StudentFields'
import Field, { formData, Notice } from '../admin/Field'
import api from '../api'

export default function RegisterEvent() {
  const [params] = useSearchParams()
  const [picked, setPicked] = useState(params.get('event') || '')
  const [msg, setMsg] = useState(null)
  const [done, setDone] = useState(null)
  const [events, setEvents] = useState([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    api.get('/public/events').then((d) => setEvents(d.items || [])).catch(() => {})
  }, [])

  const list = useMemo(() =>
    events.map((e) => ({
      key: e.id || e._id,
      name: e.name,
      date: e.displayDate || e.dateLabel || '',
      note: e.note || `${e.society || ''}${e.venue ? ' · ' + e.venue : ''}`,
    })), [events])

  const ev = list.find((e) => e.key === picked)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const v = formData(e)
    try {
      await api.post('/public/event-signups', {
        ...v,
        eventId: ev.key,
        semester: Number(v.semester),
        website: v.website || '',
      })
      setDone({ name: v.name, event: ev.name })
      e.currentTarget.reset()
    } catch (err) {
      setMsg({ ok: false, text: err.message })
    } finally { setBusy(false) }
  }

  if (done) return (
    <>
      <PageHead title="You are registered" />
      <section className="section"><div className="wrap reg-done">
        <p><strong>{done.name}</strong>, your entry for <strong>{done.event}</strong> has been sent to the DSA office. It stays pending until staff confirm it.</p>
        <div className="hero__cta"><button className="btn btn--gold" onClick={() => { setDone(null); setPicked(''); setMsg(null) }}>Enter another event</button><Link className="link" to="/">Back to home</Link></div>
      </div></section>
    </>
  )

  return (
    <>
      <PageHead title="Enter an event" lead="Step 1: click the event you want to take part in. Step 2: fill in your details." />
      <section className="section"><div className="wrap">
        <h2 className="reg-h">1. Choose an event</h2>
        <ul className="reg-pick">
          {list.map((e) => (
            <li key={e.key}><button type="button" className={picked === e.key ? 'is-on' : ''} aria-pressed={picked === e.key} onClick={() => { setPicked(e.key); setMsg(null) }}>
              <time>{e.date}</time><strong>{e.name}</strong><span>{e.note}</span>
            </button></li>
          ))}
        </ul>
        {ev && (
          <form className="adm-form reg-form" onSubmit={submit}>
            <h2>2. Your details for {ev.name}</h2>
            <StudentFields />
            <Field label="Role"><select name="role"><option>Participant</option><option>Team member</option><option>Volunteer</option></select></Field>
            <Field label="Competition category (optional)"><input name="category" /></Field>
            <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <button className="btn btn--gold" disabled={busy}>{busy ? 'Submitting…' : 'Submit registration'}</button>
            <Notice msg={msg} />
          </form>
        )}
      </div></section>
    </>
  )
}
