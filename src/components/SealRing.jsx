import { ringWords } from '../data/content'

// The real logo sits inside a slowly turning ring of society names.
export default function SealRing() {
  const text = ringWords.join('   ✦   ') + '   ✦   '
  return (
    <div className="seal" aria-hidden="true">
      <svg viewBox="0 0 600 600" className="seal__ring">
        <defs><path id="ringPath" d="M300,300 m-262,0 a262,262 0 1,1 524,0 a262,262 0 1,1 -524,0" /></defs>
        <circle cx="300" cy="300" r="290" className="seal__line" />
        <circle cx="300" cy="300" r="236" className="seal__line seal__line--thin" />
        <text className="seal__text"><textPath href="#ringPath" textLength="1640" lengthAdjust="spacing">{text}</textPath></text>
      </svg>
      <img className="seal__logo" src="/logo.png" alt="" />
    </div>
  )
}
