import { useState } from 'react'
import { useData } from '../store'
import Field, { formData, Notice } from '../Field'

export default function StudentsAdmin() {
  const { students, addStudent, removeStudent } = useData()
  const [msg, setMsg] = useState(null)
  const [q, setQ] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const v = formData(e)
    const r = await addStudent({ ...v, semester: Number(v.semester) })
    if (r.ok) e.currentTarget.reset()
    setMsg({ ok: r.ok, text: r.ok ? `${v.name} registered.` : r.error })
  }

  const shown = students.filter((s) => `${s.name} ${s.regNo} ${s.department}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <h1>Students</h1>
      <form className="adm-form" onSubmit={submit}>
        <h2>Register a student</h2>
        <Field label="Full name" wide><input name="name" required /></Field>
        <Field label="Registration number"><input name="regNo" required /></Field>
        <Field label="Department"><input name="department" required /></Field>
        <Field label="Programme"><select name="programme"><option>BS</option><option>MA / MSc</option><option>MPhil</option><option>PhD</option></select></Field>
        <Field label="Semester"><input name="semester" type="number" min="1" max="12" required /></Field>
        <button className="btn btn--gold">Register student</button>
        <Notice msg={msg} />
      </form>
      <h2>Registered students</h2>
      <Field label="Search by name, number or department"><input value={q} onChange={(e) => setQ(e.target.value)} /></Field>
      {shown.length === 0 ? <p className="muted">{students.length ? 'No student matches your search.' : 'No students yet. Use the form above to add one.'}</p> : (
        <div className="adm-table"><table>
          <thead><tr><th>Name</th><th>Reg. no.</th><th>Department</th><th>Programme</th><th>Sem.</th><th></th></tr></thead>
          <tbody>{shown.map((s) => (
            <tr key={s.id}><td>{s.name}</td><td>{s.regNo}</td><td>{s.department}</td><td>{s.programme}</td><td>{s.semester}</td>
              <td><button className="adm-del" onClick={() => window.confirm(`Delete ${s.name} and their event registrations?`) && removeStudent(s.id)}>Delete</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
    </>
  )
}
