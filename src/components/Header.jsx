import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav } from '../data/content'

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`header ${solid ? 'header--solid' : ''}`}>
      <div className="wrap header__row">
        <Link to="/" className="brand" aria-label="DSA home">
          <img src="/logo.png" alt="" width="44" height="44" />
          <span>Directorate of Students Affairs<small>University of the Punjab</small></span>
        </Link>
        <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="nav" className={`nav ${open ? 'nav--open' : ''}`}>
          {nav.map((l) => <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setOpen(false)}>{l.label}</NavLink>)}
          <Link to="/register" className="btn btn--gold btn--sm" onClick={() => setOpen(false)}>Register</Link>
        </nav>
      </div>
    </header>
  )
}
