export default function PageHead({ title, lead }) {
  return (
    <header className="page-head">
      <div className="wrap">
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
    </header>
  )
}
