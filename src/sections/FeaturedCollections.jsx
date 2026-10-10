import { Link } from 'react-router-dom'
import { productCategories } from '../data/products'
import { useReveal } from '../components/useReveal'

export default function FeaturedCollections() {
  const { ref, visible } = useReveal()
  return (
    <section className="featured-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">کالکسیون‌ها</span>
          <h2 className="section-title">سبک‌های کابینت</h2>
        </div>
        <div className="featured-grid">
          {productCategories.map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/products?style=${cat.slug}`}
              className={`featured-tile reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="img-zoom featured-img">
                <img
                  src={collectionImages[cat.slug]}
                  alt={cat.name}
                  loading={i > 1 ? 'lazy' : 'eager'}
                />
              </div>
              <div className="featured-info">
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
                <span className="featured-link">مشاهده ←</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const collectionImages = {
  modern: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  neoclassic: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
  classic: 'https://images.unsplash.com/photo-1616913291185-7edd54912c2e?w=800&q=80',
  wood: 'https://images.unsplash.com/photo-1600210492493-0fed5c3f1f1e?w=800&q=80',
}
