import { services } from '../data/content'

export default function Services() {
  return (
    <section className="section">
      <div className="wrap split">
        <div>
          <h2>What DSA handles</h2>
          <p className="muted">Everything that moves between students, societies, departments and the university administration.</p>
        </div>
        <ul className="services">
          {services.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}
        </ul>
      </div>
    </section>
  )
}
