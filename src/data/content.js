// Provisional content. Replace with official DSA data (see SRS "Information still required").
export const nav = [
  { label: 'Societies', to: '/societies' },
  { label: 'Events', to: '/events' },
  { label: 'Services', to: '/services' },
  { label: 'Complaints', to: '/complaints' },
]

export const stats = [
  { value: 11, suffix: '', label: 'university societies' },
  { value: 400, suffix: '+', label: 'participants at PU Media Fest 2026' },
  { value: 60, suffix: '+', label: 'institutions at PU Media Fest 2026' },
  { value: 1962, suffix: '', label: 'year DSA was established', plain: true },
]

export const ringWords = ['Media', 'Debating', 'Declamation', 'Literary', 'Dramatic', 'Quiz', 'Naat', 'Qiraat', 'Art', 'Singing', 'Music']

export const societyRecords = [
  'Faculty adviser and DSA focal person', 'President and cabinet, with tenure dates',
  'Members and their departments', 'Annual event calendar and weekly progress reports',
  'Competitions attended and achievements', 'Historical cabinet records and evaluations',
]
export const recruitment = [
  { title: 'Apply', text: 'Students submit personal and academic details, past experience, preferred designation and relevant achievements.' },
  { title: 'Shortlisting', text: 'Applications are checked for eligibility, experience, performance and supporting evidence.' },
  { title: 'Interview', text: 'Shortlisted candidates meet the selection panel.' },
  { title: 'Recommendation', text: 'Society leadership, the faculty adviser and DSA representatives prepare recommendations.' },
  { title: 'Appointment', text: 'The approved cabinet is officially notified and its tenure begins.' },
]
const S = (slug, name, about, events = []) => ({ slug, name, about, events })
export const societies = [
  S('media', 'Pioneers Media Society (PMS)', 'Photography, film, design and campus media coverage. Runs yearly inductions with portfolio submissions and interviews.', ['All Pakistan PU Media Fest 2026', 'PU Media Fest 2.0', 'UCP Media Fest 2026', 'GIKI Media Fest 2026', 'Interfaith Photowalk 2026', 'PMS Inductions 2026-27']),
  S('debating', 'Pioneers Debating Society', 'Represents the university in inter-university and national debating competitions.', ['National Minorities Day Debates Competition']),
  S('declamation', 'Pioneers Declamation Society', 'Trains speakers for trilingual and national declamation championships.', ['All Pakistan Khawaja Safdar Medical College Trilingual Declamation Championship 2026']),
  S('literary', 'Pioneers Literary Society', 'Writing, poetry and literary gatherings across the campus.'),
  S('dramatic', 'Pioneers Dramatic Society', 'Stage plays, skits and theatre festivals.'),
  S('quiz', 'Pioneers Quiz Society', 'Quiz teams for university and inter-university contests.'),
  S('naat', 'Pioneers Naat Society', 'Naat recitation at university programmes and competitions.'),
  S('qiraat', 'Pioneers Qiraat Society', 'Quran recitation at university programmes and competitions.'),
  S('art', 'Pioneers Art Society', 'Exhibitions, live painting and visual art competitions.', ['PUCAD Grand Art Exhibition 2026']),
  S('singing', 'Pioneers Singing Society', 'Vocal performance at festivals and university events.'),
  S('instrumental', 'Instrumental Music', 'Instrumental and music-related activity. The official society name is still to be confirmed with DSA.'),
]

export const events = [
  { name: 'PUCAD Grand Art Exhibition 2026', date: '14 Aug – 3 Sep', note: 'Art Society and PUCAD' },
  { name: 'DSA Co-curricular Admissions Trials 2026', date: '18 – 20 Aug', note: 'Trials across competition categories' },
  { name: 'Zero Week Orientation 2026', date: '7 – 11 Sep', note: 'Orientations and registrations for new students' },
  { name: 'All Pakistan PU Media Fest 2026', date: '2026', note: '13 modules, 400+ participants, 60+ institutions' },
  { name: 'Interfaith Photowalk 2026', date: '2026', note: 'Student photography walk' },
  { name: 'National Minorities Day Debates Competition', date: 'Annual', note: 'Debating Society' },
]

export const services = [
  { title: 'Society cabinets and inductions', text: 'Applications, interviews and appointments for every society, with tenure records kept year to year.' },
  { title: 'Event permissions and letters', text: 'Requests, approvals and official letters for events, transport and competition travel.' },
  { title: 'Attendance and sessional recommendations', text: 'Letters to departments for students taking part in authorised co-curricular events.' },
  { title: 'Achievements and Roll of Honour', text: 'Verified competition results and certificates, kept separate from sports records.' },
  { title: 'Disciplinary referrals', text: 'Complaints routed to the right office. Decisions stay with the authorised committees.' },
]
