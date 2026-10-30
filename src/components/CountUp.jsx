import { useEffect, useState } from 'react'
import useInView from '../hooks/useInView'

export default function CountUp({ to, suffix = '', plain = false, duration = 1400 }) {
  const [ref, seen] = useInView()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(to)
    const t0 = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to, duration])
  return <span ref={ref}>{plain ? n : n.toLocaleString()}{suffix}</span>
}
