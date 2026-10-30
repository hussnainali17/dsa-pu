import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { societies } from '../data/content'

export default function Societies() {
  return (
    <>
      <PageHead title="Societies" lead="Eleven university-level societies work under DSA. Choose one to see what it does, how to join and where it has competed." />
      <section className="section"><div className="wrap soc-grid">
        {societies.map((s) => (
          <Link key={s.slug} to={`/societies/${s.slug}`}><h3>{s.name}</h3><p>{s.about}</p></Link>
        ))}
      </div></section>
    </>
  )
}
