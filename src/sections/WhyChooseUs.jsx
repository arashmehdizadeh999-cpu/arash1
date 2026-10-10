import { whyChooseUs } from '../data/site'
import { useReveal } from '../components/useReveal'

export default function WhyChooseUs() {
  const { ref, visible } = useReveal()
  return (
    <section className="why-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">چرا کابینتو</span>
          <h2 className="section-title">آنچه ما را متمایز می‌کند</h2>
        </div>
        <div className="why-grid">
          {whyChooseUs.map((item, i) => (
            <div
              key={i}
              className={`why-card reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="why-icon">
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
