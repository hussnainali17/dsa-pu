import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Events({ limit, title = 'Recent and upcoming events' }) {
  const [events, setEvents] = useState([])
  useEffect(() => {
    api.get('/public/events')
      .then((d) => setEvents(d.items || []))
      .catch(() => {})
  }, [])

  const list = limit ? events.slice(0, limit) : events
  return (
    <section className="section section--deep">
      <div className="wrap">
        <h2>{title}</h2>
        <ul className="events">
          {list.map((e) => (
            <li key={e.id || e._id}>
              <time>{e.displayDate || e.dateLabel || (e.start ? new Date(e.start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '')}</time>
              <div><h3>{e.name}</h3><p>{e.note}</p><Link className="events__reg" to={`/register/event?event=${e.id || e._id}`}>Register for this event</Link></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
