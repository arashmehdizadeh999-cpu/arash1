import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content container">
        <span className="hero-eyebrow">کابینتو — طراحی معمارانه آشپزخانه</span>
        <h1 className="hero-title">
          آشپزخانه‌ای<br />فراتر از انتظار
        </h1>
        <p className="hero-subtitle">
          طراحی، ساخت و اجرای کابینت‌های سفارشی با نگاهی معمارانه به جزئیات، متریال و زیبایی.
        </p>
        <div className="hero-actions">
          <Link to="/portfolio" className="btn btn-primary">مشاهده نمونه‌کارها</Link>
          <Link to="/consultation" className="btn btn-outline">شروع سفارش اختصاصی</Link>
        </div>
        <div className="hero-label">
          <span className="label-line" />
          <span>کالکسیون تانگو مینیمال — TG-ML-01</span>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-text">اسکرول کنید</span>
        <span className="scroll-line" />
      </div>
    </section>
  )
}
