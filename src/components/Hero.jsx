import { Link } from 'react-router-dom'
import SealRing from './SealRing'
import CountUp from './CountUp'
import { stats } from '../data/content'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">Student life at Punjab University, organised and on record.</h1>
          <p className="hero__lead">
            The Directorate of Students Affairs backs eleven societies, sends teams to national competitions
            and keeps the paperwork behind every student who represents the university.
          </p>
          <div className="hero__cta">
            <Link className="btn btn--gold" to="/societies">Meet the societies</Link>
            <Link className="btn btn--ghost" to="/events">See recent events</Link>
          </div>
        </div>
        <SealRing />
      </div>
      <dl className="wrap stats">
        {stats.map((s) => (
          <div key={s.label}>
            <dt><CountUp to={s.value} suffix={s.suffix} plain={s.plain} /></dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
