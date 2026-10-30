import { useState } from 'react'
import PageHead from '../components/PageHead'
import StudentFields from './StudentFields'
import Field, { formData, Notice } from '../admin/Field'
import { useData } from '../admin/store'
import { COMPLAINT_CATEGORIES } from '../admin/config'

const when = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Complaints() {
  const { submitComplaint, findComplaint } = useData()
  const [done, setDone] = useState(null)
  const [found, setFound] = useState(null)
  const [msg, setMsg] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const r = submitComplaint(formData(e))
    setDone(r.ref); e.currentTarget.reset()
  }
  const track = (e) => {
    e.preventDefault()
    const v = formData(e)
    const c = findComplaint(v.ref.trim(), v.regNo.trim())
    setFound(c || null); setMsg(c ? null : { ok: false, text: 'No complaint matches that reference number and registration number.' })
  }

  return (
    <>
      <PageHead title="Complaints" lead="Tell the Directorate of Students Affairs about a problem. Staff will review it and reply here." />
      <section className="section"><div className="wrap">
        {done ? (
          <div className="reg-done" role="status">
            <p>Your complaint has been received. Your reference number is <strong className="ref">{done}</strong>. Keep it, together with your registration number, to check the reply.</p>
            <div className="hero__cta"><button className="btn btn--gold" onClick={() => setDone(null)}>Submit another complaint</button></div>
          </div>
        ) : (
          <form className="adm-form reg-form" onSubmit={submit}>
            <h2>Submit a complaint</h2>
            <p className="muted">Give accurate details. Matters outside DSA's remit are passed to the right office.</p>
            <StudentFields deptLabel="Department or college" />
            <Field label="Type of complaint"><select name="category" required>{COMPLAINT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Date of the incident (if any)"><input name="incidentDate" type="date" /></Field>
            <Field label="Society, event or person concerned (optional)" wide><input name="against" /></Field>
            <Field label="Subject" wide><input name="subject" required maxLength="120" /></Field>
            <Field label="What happened?" wide><textarea name="details" rows="6" required minLength="20" placeholder="Describe the problem, when and where it happened, and what you want DSA to do." /></Field>
            <button className="btn btn--gold">Submit complaint</button>
          </form>
        )}

        <h2 className="reg-h" style={{ marginTop: '3.5rem' }}>Check a complaint</h2>
        <form className="adm-form reg-form" onSubmit={track}>
          <Field label="Reference number"><input name="ref" required placeholder="CMP-2026-0001" /></Field>
          <Field label="Your registration number"><input name="regNo" required /></Field>
          <button className="btn btn--gold">Check status</button>
          <Notice msg={msg} />
        </form>
        {found && (
          <div className="reg-result">
            <p><span className={`adm-pill adm-pill--${found.status.toLowerCase().replace(' ', '')}`}>{found.status}</span> <strong>{found.ref}</strong>: {found.subject}</p>
            <p className="muted" style={{ maxWidth: 'none' }}>Submitted {when(found.at)}</p>
            {found.response ? <blockquote><strong>Reply from DSA{found.respondedAt ? `, ${when(found.respondedAt)}` : ''}</strong><br />{found.response}</blockquote>
              : <p>No reply yet. DSA staff will respond here.</p>}
          </div>
        )}
      </div></section>
    </>
  )
}
