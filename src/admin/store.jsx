import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import api from '../api'

const Ctx = createContext(null)
export const useData = () => useContext(Ctx)

export function DataProvider({ children }) {
  const [events, setEvents] = useState([])
  const [students, setStudents] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [eventSignups, setEventSignups] = useState([])
  const [societyApplications, setSocietyApplications] = useState([])
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  // ── Fetch helpers ──
  const loadEvents = useCallback(() =>
    api.get('/admin/events').then((d) => setEvents(d.items || [])).catch(() => {}), [])
  const loadStudents = useCallback(() =>
    api.get('/admin/students').then((d) => setStudents(d.items || [])).catch(() => {}), [])
  const loadRegistrations = useCallback(() =>
    api.get('/admin/registrations').then((d) => setRegistrations(d.items || [])).catch(() => {}), [])
  const loadSignups = useCallback(() =>
    api.get('/admin/event-signups').then((d) => setEventSignups(d.items || [])).catch(() => {}), [])
  const loadApplications = useCallback(() =>
    api.get('/admin/society-applications').then((d) => setSocietyApplications(d.items || [])).catch(() => {}), [])
  const loadComplaints = useCallback(() =>
    api.get('/admin/complaints').then((d) => setComplaints(d.items || [])).catch(() => {}), [])

  const loadAll = useCallback(async () => {
    setLoading(true)
    await Promise.all([loadEvents(), loadStudents(), loadRegistrations(), loadSignups(), loadApplications(), loadComplaints()])
    setLoading(false)
  }, [loadEvents, loadStudents, loadRegistrations, loadSignups, loadApplications, loadComplaints])

  useEffect(() => { loadAll() }, [loadAll])

  // ── Actions — keep the same { ok, error } return shape ──

  const addEvent = async (e) => {
    try { await api.post('/admin/events', e); await loadEvents(); return { ok: true } }
    catch (err) { return { ok: false, error: err.message } }
  }

  const removeEvent = async (eid) => {
    try { await api.del(`/admin/events/${eid}`); await Promise.all([loadEvents(), loadRegistrations()]); return { ok: true } }
    catch (err) { return { ok: false, error: err.message } }
  }

  const addStudent = async (s) => {
    try { await api.post('/admin/students', s); await loadStudents(); return { ok: true } }
    catch (err) { return { ok: false, error: err.message } }
  }

  const removeStudent = async (sid) => {
    try { await api.del(`/admin/students/${sid}`); await Promise.all([loadStudents(), loadRegistrations()]); return { ok: true } }
    catch (err) { return { ok: false, error: err.message } }
  }

  const register = async (eventId, studentId, role, category) => {
    try { await api.post('/admin/registrations', { eventId, studentId, role, category: category || '' }); await loadRegistrations(); return { ok: true } }
    catch (err) { return { ok: false, error: err.message } }
  }

  const unregister = async (rid) => {
    try { await api.del(`/admin/registrations/${rid}`); await loadRegistrations(); return { ok: true } }
    catch (err) { return { ok: false, error: err.message } }
  }

  // Public submissions — these now go through admin endpoints when viewed from admin panel
  const submitEventSignup = async (f) => {
    try { await api.post('/public/event-signups', f); return { ok: true } }
    catch (err) { return { ok: false, error: err.message } }
  }

  const submitSocietyApplication = async (f) => {
    try { await api.post('/public/society-applications', f); return { ok: true } }
    catch (err) { return { ok: false, error: err.message } }
  }

  const submitComplaint = async (f) => {
    try { const data = await api.post('/public/complaints', f); return { ok: true, ref: data.ref } }
    catch (err) { return { ok: false, error: err.message } }
  }

  const findComplaint = async (ref, regNo) => {
    try {
      const data = await api.post('/public/complaints/track', { ref, regNo })
      return data.complaint
    } catch { return null }
  }

  const respondComplaint = async (cid, status, response, by) => {
    try { await api.patch(`/admin/complaints/${cid}`, { status, response }); await loadComplaints(); return { ok: true } }
    catch (err) { return { ok: false, error: err.message } }
  }

  const setStatus = async (list, sid, status) => {
    try {
      const endpoint = list === 'eventSignups' ? 'event-signups' : 'society-applications'
      await api.patch(`/admin/${endpoint}/${sid}/status`, { status })
      if (list === 'eventSignups') await loadSignups(); else await loadApplications()
      return { ok: true }
    } catch (err) { return { ok: false, error: err.message } }
  }

  const approveSignup = async (sid) => {
    try {
      await api.post(`/admin/event-signups/${sid}/approve`)
      await Promise.all([loadSignups(), loadStudents(), loadRegistrations()])
      return { ok: true }
    } catch (err) { return { ok: false, error: err.message } }
  }

  const removeSubmission = async (list, sid) => {
    try {
      const endpoint = list === 'eventSignups' ? 'event-signups' : 'society-applications'
      await api.del(`/admin/${endpoint}/${sid}`)
      if (list === 'eventSignups') await loadSignups(); else await loadApplications()
      return { ok: true }
    } catch (err) { return { ok: false, error: err.message } }
  }

  const getComplaintDetail = async (cid) => {
    try {
      const data = await api.get(`/admin/complaints/${cid}`)
      return data.complaint
    } catch { return null }
  }

  return (
    <Ctx.Provider
      value={{
        events, students, registrations, eventSignups, societyApplications, complaints,
        loading, loadAll,
        addEvent, removeEvent,
        addStudent, removeStudent,
        register, unregister,
        submitEventSignup, submitSocietyApplication,
        submitComplaint, findComplaint,
        respondComplaint, setStatus, removeSubmission,
        approveSignup, getComplaintDetail,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
