import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
export const useData = () => useContext(Ctx)
const KEY = 'dsa-admin-data'
const id = () => crypto.randomUUID()

// Synthetic sample data. Never put real student records in source code.
const seed = () => ({
  events: [
    { id: id(), name: 'Zero Week Orientation 2026', society: 'DSA', level: 'University', start: '2026-09-07', end: '2026-09-11', venue: 'University of the Punjab' },
    { id: id(), name: 'DSA Co-curricular Admissions Trials 2026', society: 'DSA', level: 'University', start: '2026-08-18', end: '2026-08-20', venue: 'University of the Punjab' },
  ],
  students: [
    { id: id(), name: 'Sample Student One', regNo: 'SYN-0001', department: 'Mass Communication', programme: 'BS', semester: '3' },
    { id: id(), name: 'Sample Student Two', regNo: 'SYN-0002', department: 'English', programme: 'BS', semester: '5' },
  ],
  registrations: [],
  eventSignups: [],        // submitted by students on the public site
  societyApplications: [], // submitted by students on the public site
  complaints: [],          // submitted on the public site, answered by admins
})

export function DataProvider({ children }) {
  const [db, setDb] = useState(() => { try { return { ...seed(), ...JSON.parse(localStorage.getItem(KEY)) } } catch { return seed() } })
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(db)) } catch {} }, [db])

  // Each action returns { ok, error } so pages can show feedback. Replace with API calls later.
  const addEvent = (e) => { setDb((d) => ({ ...d, events: [{ id: id(), ...e }, ...d.events] })); return { ok: true } }
  const removeEvent = (eid) => setDb((d) => ({ ...d, events: d.events.filter((e) => e.id !== eid), registrations: d.registrations.filter((r) => r.eventId !== eid) }))
  const addStudent = (s) => {
    if (db.students.some((x) => x.regNo.toLowerCase() === s.regNo.toLowerCase())) return { ok: false, error: 'A student with this registration number already exists.' }
    setDb((d) => ({ ...d, students: [{ id: id(), ...s }, ...d.students] })); return { ok: true }
  }
  const removeStudent = (sid) => setDb((d) => ({ ...d, students: d.students.filter((s) => s.id !== sid), registrations: d.registrations.filter((r) => r.studentId !== sid) }))
  const register = (eventId, studentId, role, category) => {
    if (db.registrations.some((r) => r.eventId === eventId && r.studentId === studentId)) return { ok: false, error: 'This student is already registered for the event.' }
    setDb((d) => ({ ...d, registrations: [{ id: id(), eventId, studentId, role, category, at: new Date().toISOString() }, ...d.registrations] })); return { ok: true }
  }
  const unregister = (rid) => setDb((d) => ({ ...d, registrations: d.registrations.filter((r) => r.id !== rid) }))
  // Public student submissions. Replace with API calls later.
  const norm = (v) => String(v || '').trim().toLowerCase()
  const submitEventSignup = (f) => {
    if (db.eventSignups.some((x) => x.eventKey === f.eventKey && norm(x.regNo) === norm(f.regNo))) return { ok: false, error: 'This registration number is already registered for this event.' }
    setDb((d) => ({ ...d, eventSignups: [{ id: id(), status: 'Pending', at: new Date().toISOString(), ...f }, ...d.eventSignups] })); return { ok: true }
  }
  const submitSocietyApplication = (f) => {
    if (db.societyApplications.some((x) => x.society === f.society && norm(x.regNo) === norm(f.regNo))) return { ok: false, error: 'This registration number has already applied to this society.' }
    setDb((d) => ({ ...d, societyApplications: [{ id: id(), status: 'Pending', at: new Date().toISOString(), ...f }, ...d.societyApplications] })); return { ok: true }
  }
  // Complaints. ref is the number the student keeps to check progress.
  const submitComplaint = (f) => {
    const n = db.complaints.reduce((m, c) => Math.max(m, Number(c.ref.split('-')[2]) || 0), 0) + 1
    const ref = `CMP-${new Date().getFullYear()}-${String(n).padStart(4, '0')}`
    setDb((d) => ({ ...d, complaints: [{ id: id(), ref, status: 'New', at: new Date().toISOString(), response: '', ...f }, ...d.complaints] }))
    return { ok: true, ref }
  }
  const findComplaint = (ref, regNo) => db.complaints.find((c) => c.ref.toLowerCase() === norm(ref) && norm(c.regNo) === norm(regNo))
  const respondComplaint = (cid, status, response, by) => setDb((d) => ({ ...d, complaints: d.complaints.map((c) => (c.id === cid ? { ...c, status, response, respondedBy: by, respondedAt: response ? new Date().toISOString() : c.respondedAt } : c)) }))
  const setStatus = (list, sid, status) => setDb((d) => ({ ...d, [list]: d[list].map((x) => (x.id === sid ? { ...x, status } : x)) }))
  const removeSubmission = (list, sid) => setDb((d) => ({ ...d, [list]: d[list].filter((x) => x.id !== sid) }))
  return <Ctx.Provider value={{ ...db, addEvent, removeEvent, addStudent, removeStudent, register, unregister, submitEventSignup, submitSocietyApplication, submitComplaint, findComplaint, respondComplaint, setStatus, removeSubmission }}>{children}</Ctx.Provider>
}
