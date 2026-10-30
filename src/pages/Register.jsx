import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'

const choices = [
  { to: '/register/event', tag: 'Event entry', title: 'Enter an event', text: 'Choose an event from the DSA calendar and put your name down to take part.' },
  { to: '/register/society', tag: 'Society membership', title: 'Join a society', text: 'Apply to one of the eleven university societies, or for a cabinet position.' },
]

export default function Register() {
  return (
    <>
      <PageHead title="Student registration" lead="What would you like to sign up for? Pick one and we will take you to the right form." />
      <section className="section"><div className="wrap reg-choices">
        {choices.map((c) => (
          <Link key={c.to} to={c.to} className="reg-choice">
            <span className="reg-choice__tag">{c.tag}</span>
            <h2>{c.title}</h2>
            <p>{c.text}</p>
            <span className="link">Continue</span>
          </Link>
        ))}
      </div></section>
    </>
  )
}
