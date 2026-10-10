import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products, productCategories } from '../data/products'

export default function Products() {
  const [searchParams] = useSearchParams()
  const initialStyle = searchParams.get('style') || 'all'

  const [filterStyle, setFilterStyle] = useState(initialStyle)
  const [filterMaterial, setFilterMaterial] = useState('all')
  const [filterColor, setFilterColor] = useState('all')

  const allMaterials = useMemo(() => {
    const set = new Set()
    products.forEach(p => p.materials.forEach(m => set.add(m)))
    return Array.from(set)
  }, [])

  const allColors = useMemo(() => {
    const set = new Set()
    products.forEach(p => p.colors.forEach(c => set.add(c)))
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (filterStyle !== 'all' && p.category !== filterStyle) return false
      if (filterMaterial !== 'all' && !p.materials.includes(filterMaterial)) return false
      if (filterColor !== 'all' && !p.colors.includes(filterColor)) return false
      return true
    })
  }, [filterStyle, filterMaterial, filterColor])

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">صفحه اصلی</Link>
            <span>/</span>
            <span>محصولات</span>
          </div>
          <h1>محصولات و سبک‌های کابینت</h1>
          <p>کالکسیون کاملی از کابینت‌های سفارشی در سبک‌های مدرن، نئوکلاسیک، کلاسیک و چوبی. هر محصول با متریال‌های درجه یک و دقت اجرایی بالا ساخته می‌شود.</p>
        </div>
      </div>

      <div className="container products-page">
        {/* Filters */}
        <div className="filters-bar">
          <div className="filter-group">
            <label className="filter-label">سبک</label>
            <select className="filter-select" value={filterStyle} onChange={e => setFilterStyle(e.target.value)}>
              <option value="all">همه سبک‌ها</option>
              {productCategories.map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">متریال</label>
            <select className="filter-select" value={filterMaterial} onChange={e => setFilterMaterial(e.target.value)}>
              <option value="all">همه متریال‌ها</option>
              {allMaterials.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">رنگ</label>
            <select className="filter-select" value={filterColor} onChange={e => setFilterColor(e.target.value)}>
              <option value="all">همه رنگ‌ها</option>
              {allColors.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          {(filterStyle !== 'all' || filterMaterial !== 'all' || filterColor !== 'all') && (
            <button className="filter-reset" onClick={() => { setFilterStyle('all'); setFilterMaterial('all'); setFilterColor('all') }}>
              پاک کردن فیلترها
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>هیچ محصولی با این فیلترها یافت نشد. لطفاً فیلترها را تغییر دهید.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(product => (
              <Link key={product.slug} to={`/products/${product.slug}`} className="product-card">
                <div className="img-zoom product-img">
                  <img src={product.images[0]} alt={product.name} loading="lazy" />
                </div>
                <div className="product-info">
                  <span className="product-cat">{product.categoryName}</span>
                  <h3>{product.name}</h3>
                  <p>{product.shortDesc}</p>
                  <span className="product-code">{product.code}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
