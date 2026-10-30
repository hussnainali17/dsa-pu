import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import StudentFields from './StudentFields'
import Field, { formData, Notice } from '../admin/Field'
import { useData } from '../admin/store'
import { events as publicEvents } from '../data/content'
import { eventKey } from '../data/eventKey'

const fmt = (d) => new Date(d + 'T00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function RegisterEvent() {
  const { events: added, submitEventSignup } = useData()
  const [params] = useSearchParams()
  const [picked, setPicked] = useState(params.get('event') || '')
  const [msg, setMsg] = useState(null)
  const [done, setDone] = useState(null)

  // Calendar events plus any events the DSA office has registered.
  const list = useMemo(() => [
    ...added.map((e) => ({ key: e.id, name: e.name, date: e.start === e.end ? fmt(e.start) : `${fmt(e.start)} to ${fmt(e.end)}`, note: `${e.society} · ${e.venue}` })),
    ...publicEvents.filter((e) => !added.some((a) => eventKey(a.name) === eventKey(e.name))).map((e) => ({ key: eventKey(e.name), name: e.name, date: e.date, note: e.note })),
  ], [added])
  const ev = list.find((e) => e.key === picked)

  const submit = (e) => {
    e.preventDefault()
    const v = formData(e)
    const r = submitEventSignup({ ...v, eventKey: ev.key, eventName: ev.name })
    if (r.ok) { setDone({ name: v.name, event: ev.name }); e.currentTarget.reset() } else setMsg({ ok: false, text: r.error })
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
            <button className="btn btn--gold">Submit registration</button>
            <Notice msg={msg} />
          </form>
        )}
      </div></section>
    </>
  )
}
