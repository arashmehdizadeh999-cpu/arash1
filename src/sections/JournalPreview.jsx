import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { useReveal } from '../components/useReveal'

export default function JournalPreview() {
  const { ref, visible } = useReveal()
  const featured = articles.slice(0, 3)

  return (
    <section className="journal-preview-section" ref={ref}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <span className="eyebrow">مجله</span>
            <h2 className="section-title">آخرین مقالات</h2>
          </div>
          <Link to="/journal" className="btn btn-ghost">همه مقالات ←</Link>
        </div>
        <div className="journal-grid">
          {featured.map((article, i) => (
            <Link
              key={article.slug}
              to={`/journal/${article.slug}`}
              className={`journal-card reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
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
    </section>
  )
}
