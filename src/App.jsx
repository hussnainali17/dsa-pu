import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SwipeNav from './components/SwipeNav'
import Home from './pages/Home'
import Societies from './pages/Societies'
import SocietyDetail from './pages/SocietyDetail'
import EventsPage from './pages/EventsPage'
import ServicesPage from './pages/ServicesPage'
import Register from './pages/Register'
import Complaints from './pages/Complaints'
import ComplaintsAdmin from './admin/pages/ComplaintsAdmin'
import RegisterEvent from './pages/RegisterEvent'
import RegisterSociety from './pages/RegisterSociety'
import { AuthProvider } from './admin/auth'
import { DataProvider } from './admin/store'
import AdminShell from './admin/AdminShell'
import Overview from './admin/pages/Overview'
import EventsAdmin from './admin/pages/EventsAdmin'
import StudentsAdmin from './admin/pages/StudentsAdmin'
import RegistrationsAdmin from './admin/pages/RegistrationsAdmin'
import SubmissionsAdmin from './admin/pages/SubmissionsAdmin'

function PublicLayout() {
  return (<><SwipeNav /><Header /><main><Outlet /></main><Footer /></>)
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider><DataProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/societies" element={<Societies />} />
            <Route path="/societies/:slug" element={<SocietyDetail />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/event" element={<RegisterEvent />} />
            <Route path="/register/society" element={<RegisterSociety />} />
          </Route>
          {/* Not linked anywhere on the public site. Open /admin directly. */}
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<Overview />} />
            <Route path="events" element={<EventsAdmin />} />
            <Route path="students" element={<StudentsAdmin />} />
            <Route path="registrations" element={<RegistrationsAdmin />} />
            <Route path="submissions" element={<SubmissionsAdmin />} />
            <Route path="complaints" element={<ComplaintsAdmin />} />
          </Route>
          <Route path="*" element={<PublicLayout />}><Route path="*" element={<Home />} /></Route>
        </Routes>
      </DataProvider></AuthProvider>
    </BrowserRouter>
  )
}
