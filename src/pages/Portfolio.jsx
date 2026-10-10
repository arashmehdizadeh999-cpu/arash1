import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function Portfolio() {
  const [filterStyle, setFilterStyle] = useState('all')
  const [filterColor, setFilterColor] = useState('all')

  const styles = useMemo(() => {
    const set = new Set()
    projects.forEach(p => set.add(JSON.stringify({ slug: p.style, name: p.styleName })))
    return Array.from(set).map(s => JSON.parse(s))
  }, [])

  const colors = useMemo(() => {
    const set = new Set()
    projects.forEach(p => set.add(JSON.stringify({ slug: p.color, name: p.colorName })))
    return Array.from(set).map(s => JSON.parse(s))
  }, [])

  const filtered = useMemo(() => {
    return projects.filter(p => {
      if (filterStyle !== 'all' && p.style !== filterStyle) return false
      if (filterColor !== 'all' && p.color !== filterColor) return false
      return true
    })
  }, [filterStyle, filterColor])

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">صفحه اصلی</Link>
            <span>/</span>
            <span>نمونه‌کارها</span>
          </div>
          <h1>نمونه‌کارها</h1>
          <p>گالری پروژه‌های اجراشده کابینتو — هر پروژه نمونه‌ای از ترکیب طراحی، متریال و اجرای دقیق است.</p>
        </div>
      </div>

      <div className="container portfolio-page">
        <div className="filters-bar">
          <div className="filter-group">
            <label className="filter-label">سبک</label>
            <select className="filter-select" value={filterStyle} onChange={e => setFilterStyle(e.target.value)}>
              <option value="all">همه سبک‌ها</option>
              {styles.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">رنگ غالب</label>
            <select className="filter-select" value={filterColor} onChange={e => setFilterColor(e.target.value)}>
              <option value="all">همه رنگ‌ها</option>
              {colors.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          {(filterStyle !== 'all' || filterColor !== 'all') && (
            <button className="filter-reset" onClick={() => { setFilterStyle('all'); setFilterColor('all') }}>
              پاک کردن فیلترها
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>هیچ پروژه‌ای با این فیلترها یافت نشد.</p>
          </div>
        ) : (
          <div className="portfolio-grid">
            {filtered.map((project, i) => (
              <Link
                key={project.slug}
                to={`/portfolio/${project.slug}`}
                className={`portfolio-tile ${i % 3 === 0 ? 'tall' : ''} ${i % 5 === 4 ? 'wide' : ''}`}
              >
                <div className="img-zoom portfolio-tile-img">
                  <img src={project.coverImage} alt={project.name} loading="lazy" />
                </div>
                <div className="portfolio-tile-info">
                  <div className="portfolio-meta">
                    <span>{project.styleName}</span>
                    <span className="meta-dot">·</span>
                    <span>{project.colorName}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.shortDesc}</p>
                  <span className="portfolio-link">مشاهده پروژه ←</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
