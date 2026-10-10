import { Link } from 'react-router-dom'
import { BRAND_NAME } from '../data/brand'
import { productCategories } from '../data/products'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col footer-brand">
            <Link to="/" className="footer-logo">
              <span className="brand-mark">K</span>
              <span className="brand-name">{BRAND_NAME}</span>
            </Link>
            <p className="footer-intro">
              طراحی، ساخت و اجرای کابینت‌های سفارشی با نگاهی معمارانه به جزئیات، متریال و زیبایی. کابینتو، فضای آشپزخانه شما را اثری ماندگار می‌سازد.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">دسترسی سریع</h4>
            <ul>
              <li><Link to="/products">محصولات</Link></li>
              <li><Link to="/portfolio">نمونه‌کارها</Link></li>
              <li><Link to="/materials">متریال و رنگ‌ها</Link></li>
              <li><Link to="/services">خدمات</Link></li>
              <li><Link to="/about">درباره ما</Link></li>
              <li><Link to="/journal">مجله</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">سبک‌های کابینت</h4>
            <ul>
              {productCategories.map(cat => (
                <li key={cat.slug}>
                  <Link to={`/products?style=${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">تماس با ما</h4>
            <ul className="footer-contact">
              <li className="contact-item">
                <span className="contact-label">تلفن:</span>
                <span className="contact-value placeholder">[شماره تماس]</span>
              </li>
              <li className="contact-item">
                <span className="contact-label">آدرس:</span>
                <span className="contact-value placeholder">[آدرس نمایشگاه]</span>
              </li>
              <li className="contact-item">
                <span className="contact-label">ساعات کاری:</span>
                <span className="contact-value">شنبه تا پنجشنبه، ۹ تا ۱۸</span>
              </li>
            </ul>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="اینستاگرام">اینستاگرام</a>
              <a href="#" className="social-link" aria-label="واتساپ">واتساپ</a>
              <a href="#" className="social-link" aria-label="تلگرام">تلگرام</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} {BRAND_NAME}. تمامی حقوق محفوظ است.
          </p>
          <Link to="/consultation" className="footer-cta">درخواست مشاوره رایگان ←</Link>
        </div>
      </div>
    </footer>
  )
}
