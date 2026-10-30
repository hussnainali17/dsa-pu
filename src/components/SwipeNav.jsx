import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Touch swipe navigation for the public site: swipe right = go back, swipe left = go forward.
// No buttons. Ignores swipes that start on form fields or on horizontally scrollable areas,
// and the outermost screen edges, which phones already use for their own back gesture.
const MIN_X = 90, MAX_Y = 60, MAX_MS = 700, EDGE = 24

const scrollsSideways = (el) => {
  for (; el && el !== document.body; el = el.parentElement) {
    const o = getComputedStyle(el).overflowX
    if ((o === 'auto' || o === 'scroll') && el.scrollWidth > el.clientWidth) return true
  }
  return false
}

export default function SwipeNav() {
  const navigate = useNavigate()
  const { key } = useLocation()
  useEffect(() => {
    let s = null
    const start = (e) => {
      const t = e.touches[0]
      const bad = e.touches.length > 1 || e.target.closest('input,textarea,select,[contenteditable]') || scrollsSideways(e.target)
      const edge = t.clientX < EDGE || t.clientX > window.innerWidth - EDGE
      s = bad || edge ? null : { x: t.clientX, y: t.clientY, at: Date.now() }
    }
    const end = (e) => {
      if (!s) return
      const t = e.changedTouches[0], dx = t.clientX - s.x, dy = t.clientY - s.y, quick = Date.now() - s.at < MAX_MS
      s = null
      if (!quick || Math.abs(dy) > MAX_Y || Math.abs(dx) < MIN_X || Math.abs(dx) < Math.abs(dy) * 2) return
      if (dx > 0) { if (key !== 'default') navigate(-1) } // right swipe: back, but never leave the site
      else navigate(1)                                      // left swipe: forward (does nothing without forward history)
    }
    const cancel = () => { s = null }
    document.addEventListener('touchstart', start, { passive: true })
    document.addEventListener('touchend', end, { passive: true })
    document.addEventListener('touchcancel', cancel, { passive: true })
    return () => { document.removeEventListener('touchstart', start); document.removeEventListener('touchend', end); document.removeEventListener('touchcancel', cancel) }
  }, [navigate, key])
  return null
}
