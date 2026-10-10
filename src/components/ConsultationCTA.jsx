import { Link } from 'react-router-dom'

export default function ConsultationCTA({ heading, text, cta }) {
  return (
    <section className="consultation-cta-section">
      <div className="cta-bg" />
      <div className="cta-overlay" />
      <div className="container cta-content">
        <span className="eyebrow">کابینتو</span>
        <h2 className="section-title">{heading || 'برای آشپزخانه ایده‌آل خود برنامه‌ریزی کنید'}</h2>
        <p className="body-text cta-text">
          {text || 'از اولین ایده تا انتخاب متریال و اجرای نهایی، برای طراحی فضای دلخواهتان همراه شما هستیم.'}
        </p>
        <Link to="/consultation" className="btn btn-primary cta-btn">
          {cta || 'درخواست مشاوره رایگان'}
        </Link>
      </div>
    </section>
  )
}
