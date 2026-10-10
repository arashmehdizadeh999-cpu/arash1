import { useState } from 'react'
import { Link } from 'react-router-dom'
import { materials, materialCategories } from '../data/materials'
import ConsultationCTA from '../components/ConsultationCTA'

export default function Materials() {
  const [filter, setFilter] = useState('all')
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cabineto-saved-materials') || '[]') } catch { return [] }
  })

  const toggleSave = (slug) => {
    const next = saved.includes(slug) ? saved.filter(s => s !== slug) : [...saved, slug]
    setSaved(next)
    localStorage.setItem('cabineto-saved-materials', JSON.stringify(next))
  }

  const filtered = filter === 'all' ? materials : materials.filter(m => m.category === filter)

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">صفحه اصلی</Link>
            <span>/</span>
            <span>متریال و رنگ‌ها</span>
          </div>
          <h1>متریال و رنگ‌ها</h1>
          <p>کتابخانه کامل متریال‌های فاساد، صفحه کابینت و انواع پرداخت. هر متریال با توضیح تخصصی و نمونه رنگ‌های موجود ارائه می‌شود.</p>
        </div>
      </div>

      <div className="container materials-page">
        <div className="materials-filters">
          <button
            className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            همه
          </button>
          {materialCategories.map(cat => (
            <button
              key={cat.slug}
              className={`filter-chip ${filter === cat.slug ? 'active' : ''}`}
              onClick={() => setFilter(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {saved.length > 0 && (
          <div className="saved-materials-bar">
            <span>{saved.length} متریال ذخیره شده</span>
            <button className="filter-reset" onClick={() => { setSaved([]); localStorage.removeItem('cabineto-saved-materials') }}>
              پاک کردن
            </button>
          </div>
        )}

        <div className="materials-catalog-grid">
          {filtered.map(mat => (
            <div key={mat.slug} className="material-catalog-card">
              <div className="img-zoom material-catalog-img">
                <img src={mat.image} alt={mat.name} loading="lazy" />
              </div>
              <div className="material-catalog-info">
                <div className="material-catalog-head">
                  <span className="material-catalog-cat">{mat.categoryName}</span>
                  <button
                    className={`save-btn ${saved.includes(mat.slug) ? 'saved' : ''}`}
                    onClick={() => toggleSave(mat.slug)}
                    aria-label="ذخیره متریال"
                  >
                    {saved.includes(mat.slug) ? '★' : '☆'}
                  </button>
                </div>
                <h3>{mat.name}</h3>
                <p>{mat.description}</p>
                <div className="material-swatches">
                  {mat.colors.map((color, ci) => (
                    <span key={ci} className="swatch" style={{ background: color }} aria-label={`رنگ ${ci + 1}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConsultationCTA
        heading="مشاوره انتخاب متریال"
        text="در انتخاب متریال مناسب مطمئن نیستید؟ کارشناسان ما شما را در انتخاب بهترین گزینه متناسب با بودجه و سبک شما همراهی می‌کنند."
        cta="درخواست مشاوره متریال"
      />
    </div>
  )
}
