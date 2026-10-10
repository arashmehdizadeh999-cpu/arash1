import { testimonials } from '../data/site'
import { useReveal } from '../components/useReveal'

export default function Testimonials() {
  const { ref, visible } = useReveal()
  return (
    <section className="testimonials-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">نظرات مشتریان</span>
          <h2 className="section-title">تجربه مشتریان ما</h2>
        </div>
        <div className={`testimonials-grid reveal ${visible ? 'visible' : ''}`}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span className="testimonial-project">{t.project}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
