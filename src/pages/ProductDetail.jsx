import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import ConsultationCTA from '../components/ConsultationCTA'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const [activeImage, setActiveImage] = useState(0)

  if (!product) return <NotFound />

  const related = getRelatedProducts(slug)

  return (
    <div className="page">
      {/* Hero Image */}
      <div className="product-hero">
        <img src={product.images[0]} alt={product.name} />
        <div className="product-hero-overlay">
          <div className="container">
            <div className="breadcrumbs">
              <Link to="/">صفحه اصلی</Link>
              <span>/</span>
              <Link to="/products">محصولات</Link>
              <span>/</span>
              <span>{product.name}</span>
            </div>
            <span className="eyebrow">{product.categoryName}</span>
            <h1>{product.name}</h1>
            <span className="product-code-large">{product.code}</span>
          </div>
        </div>
      </div>

      <div className="container product-detail">
        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="gallery-main img-zoom">
              <img src={product.images[activeImage]} alt={product.name} />
            </div>
            <div className="gallery-thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`gallery-thumb ${i === activeImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`تصویر ${i + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="product-info-panel">
            <h2>{product.name}</h2>
            <p className="body-text">{product.description}</p>

            <div className="detail-block">
              <h4>متریال‌های موجود</h4>
              <div className="tag-list">
                {product.materials.map(m => <span key={m} className="tag">{m}</span>)}
              </div>
            </div>

            <div className="detail-block">
              <h4>رنگ‌های موجود</h4>
              <div className="tag-list">
                {product.colors.map(c => <span key={c} className="tag">{c}</span>)}
              </div>
            </div>

            <div className="detail-block">
              <h4>مشخصات فنی</h4>
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="product-cta-row">
              <Link to="/consultation" className="btn btn-primary">درخواست قیمت</Link>
              <Link to="/consultation" className="btn btn-outline">درخواست مشاوره</Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="related-products">
            <h2 className="section-title">محصولات مرتبط</h2>
            <div className="related-grid">
              {related.map(p => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="product-card">
                  <div className="img-zoom product-img">
                    <img src={p.images[0]} alt={p.name} loading="lazy" />
                  </div>
                  <div className="product-info">
                    <span className="product-cat">{p.categoryName}</span>
                    <h3>{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <ConsultationCTA />
    </div>
  )
}
