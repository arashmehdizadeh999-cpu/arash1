import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles, articleCategories } from '../data/articles'

export default function Journal() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter)
  const featured = articles[0]

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">صفحه اصلی</Link>
            <span>/</span>
            <span>مجله</span>
          </div>
          <h1>مجله کابینتو</h1>
          <p>مقالات تخصصی درباره طراحی آشپزخانه، انتخاب متریال، نگهداری کابینت و معماری داخلی.</p>
        </div>
      </div>

      <div className="container journal-page">
        {/* Featured Article */}
        <Link to={`/journal/${featured.slug}`} className="journal-featured">
          <div className="img-zoom journal-featured-img">
            <img src={featured.coverImage} alt={featured.title} />
          </div>
          <div className="journal-featured-info">
            <span className="journal-cat">{featured.categoryName} · {featured.date}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="journal-link">ادامه مطلب ←</span>
          </div>
        </Link>

        {/* Category Filter */}
        <div className="materials-filters">
          <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>همه</button>
          {articleCategories.map(cat => (
            <button
              key={cat.slug}
              className={`filter-chip ${filter === cat.slug ? 'active' : ''}`}
              onClick={() => setFilter(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="journal-grid">
          {filtered.map(article => (
            <Link key={article.slug} to={`/journal/${article.slug}`} className="journal-card">
              <div className="img-zoom journal-img">
                <img src={article.coverImage} alt={article.title} loading="lazy" />
              </div>
              <div className="journal-info">
                <span className="journal-cat">{article.categoryName} · {article.date}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="journal-link">ادامه مطلب ←</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
