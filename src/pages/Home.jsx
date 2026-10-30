import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Events from '../components/Events'

export default function Home() {
  return (
    <>
      <Hero />
      <section className="section"><div className="wrap split">
        <div><h2>Eleven societies, one directorate</h2></div>
        <div>
          <p className="muted" style={{ maxWidth: '50ch' }}>Debating, declamation, media, art, music and more. Each society has its own cabinet, adviser and calendar.</p>
          <p style={{ marginTop: '1.2rem' }}><Link className="link" to="/societies">Browse all societies</Link></p>
        </div>
      </div></section>
      <Events limit={3} />
    </>
  )
}
