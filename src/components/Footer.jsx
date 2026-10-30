export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <img src="/logo.png" alt="" width="56" height="56" />
        <p>Directorate of Students Affairs<br />University of the Punjab, Lahore</p>
        <p className="footer__small">© {new Date().getFullYear()} DSA. Content is provisional until confirmed by the directorate.</p>
      </div>
    </footer>
  )
}
