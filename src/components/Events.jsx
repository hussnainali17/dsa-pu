import { Link } from 'react-router-dom'
import { events } from '../data/content'
import { eventKey } from '../data/eventKey'

export default function Events({ limit, title = 'Recent and upcoming events' }) {
  const list = limit ? events.slice(0, limit) : events
  return (
    <section className="section section--deep">
      <div className="wrap">
        <h2>{title}</h2>
        <ul className="events">
          {list.map((e) => (
            <li key={e.name}>
              <time>{e.date}</time>
              <div><h3>{e.name}</h3><p>{e.note}</p><Link className="events__reg" to={`/register/event?event=${eventKey(e.name)}`}>Register for this event</Link></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
