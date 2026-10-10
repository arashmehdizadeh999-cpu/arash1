import { Link, useParams } from 'react-router-dom'
import { getArticleBySlug, getRelatedArticles } from '../data/articles'
import ConsultationCTA from '../components/ConsultationCTA'
import NotFound from './NotFound'

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)

  if (!article) return <NotFound />

  const related = getRelatedArticles(slug)

  return (
    <div className="page">
      <div className="article-hero">
        <img src={article.coverImage} alt={article.title} />
        <div className="article-hero-overlay">
          <div className="container">
            <div className="breadcrumbs">
              <Link to="/">صفحه اصلی</Link>
              <span>/</span>
              <Link to="/journal">مجله</Link>
              <span>/</span>
              <span>{article.categoryName}</span>
            </div>
            <span className="eyebrow">{article.categoryName} · {article.date}</span>
            <h1>{article.title}</h1>
          </div>
        </div>
      </div>

      <div className="container article-detail">
        <article className="article-body">
          {article.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        {related.length > 0 && (
          <div className="related-articles">
            <h2 className="section-title">مقالات مرتبط</h2>
            <div className="journal-grid">
              {related.map(a => (
                <Link key={a.slug} to={`/journal/${a.slug}`} className="journal-card">
                  <div className="img-zoom journal-img">
                    <img src={a.coverImage} alt={a.title} loading="lazy" />
                  </div>
                  <div className="journal-info">
                    <span className="journal-cat">{a.categoryName} · {a.date}</span>
                    <h3>{a.title}</h3>
                    <p>{a.excerpt}</p>
                    <span className="journal-link">ادامه مطلب ←</span>
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
