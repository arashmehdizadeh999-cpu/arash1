import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page not-found-page">
      <div className="container not-found-content">
        <span className="not-found-code">۴۰۴</span>
        <h1>صفحه یافت نشد</h1>
        <p className="body-text">صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.</p>
        <Link to="/" className="btn btn-primary">بازگشت به صفحه اصلی</Link>
      </div>
    </div>
  )
}
