import Field from '../admin/Field'

// Details every student gives, whichever form they are filling in.
export default function StudentFields({ deptLabel = 'Department' }) {
  return (
    <>
      <Field label="Full name" wide><input name="name" autoComplete="name" required /></Field>
      <Field label="Registration number"><input name="regNo" required /></Field>
      <Field label={deptLabel}><input name="department" required /></Field>
      <Field label="Programme"><select name="programme"><option>BS</option><option>MA / MSc</option><option>MPhil</option><option>PhD</option></select></Field>
      <Field label="Semester"><input name="semester" type="number" min="1" max="12" required /></Field>
      <Field label="University email"><input name="email" type="email" autoComplete="email" required /></Field>
      <Field label="Mobile number"><input name="phone" type="tel" autoComplete="tel" placeholder="e.g. 03001234567" required /></Field>
    </>
  )
}
