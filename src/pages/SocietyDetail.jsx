import { Link, useParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { societies, societyRecords, recruitment } from '../data/content'

export default function SocietyDetail() {
  const { slug } = useParams()
  const i = societies.findIndex((x) => x.slug === slug)
  if (i < 0) return <PageHead title="Society not found" lead="Check the address or pick a society from the list." />
  const s = societies[i]
  const prev = societies[(i + societies.length - 1) % societies.length]
  const next = societies[(i + 1) % societies.length]
  return (
    <>
      <PageHead title={s.name} lead={s.about} />
      <div className="section"><div className="wrap">
        <section className="block">
          <h2>Society details</h2>
          <dl className="facts">
            <div><dt>Faculty adviser</dt><dd className="tbc">To be confirmed by DSA</dd></div>
            <div><dt>President and cabinet</dt><dd className="tbc">To be confirmed by DSA</dd></div>
            <div><dt>Society code</dt><dd className="tbc">To be confirmed by DSA</dd></div>
            <div><dt>DSA focal person</dt><dd className="tbc">To be confirmed by DSA</dd></div>
          </dl>
        </section>
        <section className="block">
          <h2>Events and competitions</h2>
          {s.events.length ? <ul className="tick">{s.events.map((e) => <li key={e}>{e}</li>)}</ul>
            : <p className="muted">Event and competition records for this society will appear here.</p>}
        </section>
        <section className="block">
          <h2>How to join the cabinet</h2>
          <ol className="steps">{recruitment.map((r) => <li key={r.title}><div><h3>{r.title}</h3><p>{r.text}</p></div></li>)}</ol>
          <p style={{ marginTop: '1.2rem' }}><Link className="btn btn--gold" to={`/register/society?society=${s.slug}`}>Join this society</Link></p>
          <p className="muted" style={{ marginTop: '1rem', maxWidth: 'none' }}>Scoring weights and appointment authorities are pending official confirmation.</p>
        </section>
        <section className="block">
          <h2>Records DSA keeps for this society</h2>
          <ul className="tick">{societyRecords.map((r) => <li key={r}>{r}</li>)}</ul>
        </section>
        <nav className="pager" aria-label="Other societies">
          <Link className="link" to={`/societies/${prev.slug}`}>Previous: {prev.name}</Link>
          <Link className="link" to={`/societies/${next.slug}`}>Next: {next.name}</Link>
        </nav>
      </div></div>
    </>
  )
}
