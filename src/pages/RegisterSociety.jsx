import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import StudentFields from './StudentFields'
import Field, { formData, Notice } from '../admin/Field'
import api from '../api'

export default function RegisterSociety() {
  const [params] = useSearchParams()
  const [picked, setPicked] = useState(params.get('society') || '')
  const [msg, setMsg] = useState(null)
  const [done, setDone] = useState(null)
  const [societies, setSocieties] = useState([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    api.get('/public/societies').then((d) => setSocieties(d.items || [])).catch(() => {})
  }, [])

  const soc = societies.find((s) => s.slug === picked)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const v = formData(e)
    try {
      await api.post('/public/society-applications', {
        ...v,
        societyId: soc.id || soc._id,
        semester: Number(v.semester),
        website: v.website || '',
      })
      setDone({ name: v.name, society: soc.name })
      e.currentTarget.reset()
    } catch (err) {
      setMsg({ ok: false, text: err.message })
    } finally { setBusy(false) }
  }

  if (done) return (
    <>
      <PageHead title="Application sent" />
      <section className="section"><div className="wrap reg-done">
        <p><strong>{done.name}</strong>, your application to <strong>{done.society}</strong> has been sent to the DSA office. You will be contacted about the next step.</p>
        <div className="hero__cta"><button className="btn btn--gold" onClick={() => { setDone(null); setPicked(''); setMsg(null) }}>Apply to another society</button><Link className="link" to="/">Back to home</Link></div>
      </div></section>
    </>
  )

  return (
    <>
      <PageHead title="Join a society" lead="Step 1: click the society you want to join. Step 2: fill in your details." />
      <section className="section"><div className="wrap">
        <h2 className="reg-h">1. Choose a society</h2>
        <ul className="reg-pick reg-pick--soc">
          {societies.map((s) => (
            <li key={s.slug}><button type="button" className={picked === s.slug ? 'is-on' : ''} aria-pressed={picked === s.slug} onClick={() => { setPicked(s.slug); setMsg(null) }}>
              <strong>{s.name}</strong>
            </button></li>
          ))}
        </ul>
        {soc && (
          <form className="adm-form reg-form" onSubmit={submit}>
            <h2>2. Your application to {soc.name}</h2>
            <StudentFields />
            <Field label="Applying as"><select name="applyingAs"><option>General member</option><option>Cabinet position</option></select></Field>
            <Field label="Preferred position (cabinet applicants)"><input name="position" /></Field>
            <Field label="Past experience and achievements (optional)" wide><textarea name="experience" rows="4" /></Field>
            <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <button className="btn btn--gold" disabled={busy}>{busy ? 'Submitting…' : 'Submit application'}</button>
            <Notice msg={msg} />
          </form>
        )}
      </div></section>
    </>
  )
}
