import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { useReveal } from '../components/useReveal'

export default function SelectedProjects() {
  const { ref, visible } = useReveal()
  const featured = projects.slice(0, 4)

  return (
    <section className="projects-section" ref={ref}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <span className="eyebrow">نمونه‌کارها</span>
            <h2 className="section-title">پروژه‌های منتخب</h2>
          </div>
          <Link to="/portfolio" className="btn btn-ghost">همه پروژه‌ها ←</Link>
        </div>
        <div className="projects-grid">
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              to={`/portfolio/${project.slug}`}
              className={`project-card reveal ${visible ? 'visible' : ''} ${i % 2 === 0 ? 'wide' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="img-zoom project-img">
                <img src={project.coverImage} alt={project.name} loading={i > 1 ? 'lazy' : 'eager'} />
              </div>
              <div className="project-info">
                <div className="project-meta">
                  <span>{project.styleName}</span>
                  <span className="meta-dot">·</span>
                  <span>{project.colorName}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.shortDesc}</p>
                <span className="project-link">مشاهده پروژه ←</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
