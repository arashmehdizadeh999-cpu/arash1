import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug, getRelatedProjects } from '../data/projects'
import ConsultationCTA from '../components/ConsultationCTA'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const [activeImage, setActiveImage] = useState(0)

  if (!project) return <NotFound />

  const related = getRelatedProjects(slug)

  return (
    <div className="page">
      {/* Cover */}
      <div className="project-cover">
        <img src={project.coverImage} alt={project.name} />
        <div className="project-cover-overlay">
          <div className="container">
            <div className="breadcrumbs">
              <Link to="/">صفحه اصلی</Link>
              <span>/</span>
              <Link to="/portfolio">نمونه‌کارها</Link>
              <span>/</span>
              <span>{project.name}</span>
            </div>
            <h1>{project.name}</h1>
            <div className="project-cover-meta">
              <span>{project.styleName}</span>
              <span className="meta-dot">·</span>
              <span>{project.colorName}</span>
              <span className="meta-dot">·</span>
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container project-detail">
        {/* Overview */}
        <div className="project-overview">
          <div className="project-overview-text">
            <span className="eyebrow">درباره پروژه</span>
            <p className="body-text">{project.description}</p>
          </div>
          <div className="project-specs-panel">
            <h4>مشخصات پروژه</h4>
            <table className="specs-table">
              <tbody>
                {Object.entries(project.specs).map(([key, val]) => (
                  <tr key={key}>
                    <td className="spec-key">{key}</td>
                    <td className="spec-val">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gallery */}
        <div className="project-gallery">
          <div className="gallery-main img-zoom">
            <img src={project.images[activeImage]} alt={project.name} />
          </div>
          <div className="gallery-thumbs">
            {project.images.map((img, i) => (
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

        {/* Related */}
        {related.length > 0 && (
          <div className="related-projects">
            <h2 className="section-title">پروژه‌های مرتبط</h2>
            <div className="related-grid">
              {related.map(p => (
                <Link key={p.slug} to={`/portfolio/${p.slug}`} className="product-card">
                  <div className="img-zoom product-img">
                    <img src={p.coverImage} alt={p.name} loading="lazy" />
                  </div>
                  <div className="product-info">
                    <span className="product-cat">{p.styleName}</span>
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
