import { Link } from 'react-router-dom'
import { materials } from '../data/materials'
import { useReveal } from '../components/useReveal'

export default function MaterialsFinishes() {
  const { ref, visible } = useReveal()
  const featured = materials.slice(0, 6)

  return (
    <section className="materials-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">متریال و پرداخت</span>
          <h2 className="section-title">کتابخانه متریال</h2>
        </div>
        <div className="materials-grid">
          {featured.map((mat, i) => (
            <Link
              key={mat.slug}
              to="/materials"
              className={`material-card reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="material-img img-zoom">
                <img src={mat.image} alt={mat.name} loading="lazy" />
              </div>
              <div className="material-info">
                <h3>{mat.name}</h3>
                <p>{mat.description}</p>
                <div className="material-swatches">
                  {mat.colors.map((color, ci) => (
                    <span
                      key={ci}
                      className="swatch"
                      style={{ background: color }}
                      aria-label={`رنگ ${ci + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
