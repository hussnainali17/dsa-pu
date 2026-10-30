import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './auth'

export default function AdminLogin() {
  const { login } = useAuth()
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setBusy(true); setErr('')
    try { await login(f.get('username'), f.get('password')) } catch (x) { setErr(x.message); setBusy(false) }
  }
  return (
    <div className="adm-login">
      <form className="adm-login__box" onSubmit={submit}>
        <img src="/logo.png" alt="" width="84" height="84" />
        <h1>DSA staff sign-in</h1>
        <p>For authorised Directorate of Students Affairs staff only.</p>
        <label className="adm-field"><span>Username</span><input name="username" autoComplete="username" required autoFocus /></label>
        <label className="adm-field"><span>Password</span><input name="password" type="password" autoComplete="current-password" required /></label>
        {err && <p role="alert" className="adm-notice is-err">{err}</p>}
        <button className="btn btn--gold" disabled={busy}>{busy ? 'Signing in' : 'Sign in'}</button>
        <Link to="/" className="adm-login__back">Back to the public site</Link>
      </form>
    </div>
  )
}
