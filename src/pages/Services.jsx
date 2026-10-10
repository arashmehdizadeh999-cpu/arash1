import { Link } from 'react-router-dom'
import { services } from '../data/site'
import ConsultationCTA from '../components/ConsultationCTA'

export default function Services() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">صفحه اصلی</Link>
            <span>/</span>
            <span>خدمات</span>
          </div>
          <h1>خدمات</h1>
          <p>از مشاوره اولیه تا نصب و تحویل، تمام مراحل ساخت کابینت سفارشی را با تیم متخصص کابینتو طی کنید.</p>
        </div>
      </div>

      <div className="container services-page">
        <div className="services-list">
          {services.map((service, i) => (
            <div key={service.slug} className={`service-row ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="service-content">
                <span className="service-icon">{service.icon}</span>
                <h2>{service.title}</h2>
                <p className="body-text">{service.description}</p>
                <ul className="service-details">
                  {service.details.map((d, di) => (
                    <li key={di}>
                      <span className="check">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <Link to="/consultation" className="btn btn-outline">درخواست این خدمت</Link>
              </div>
              <div className="service-number">
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConsultationCTA />
    </div>
  )
}
