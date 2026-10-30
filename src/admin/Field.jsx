export default function Field({ label, children, wide }) {
  return <label className={`adm-field ${wide ? 'adm-field--wide' : ''}`}><span>{label}</span>{children}</label>
}
export const formData = (e) => Object.fromEntries(new FormData(e.currentTarget))
export function Notice({ msg }) {
  if (!msg) return null
  return <p role="status" className={`adm-notice ${msg.ok ? 'is-ok' : 'is-err'}`}>{msg.text}</p>
}
