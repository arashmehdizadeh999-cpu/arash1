import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'نام و نام خانوادگی الزامی است'
    if (!form.phone.trim()) e.phone = 'شماره تماس الزامی است'
    else if (!/^0?\d{10,11}$/.test(form.phone.replace(/[\s-]/g, ''))) e.phone = 'شماره تماس معتبر نیست'
    if (!form.message.trim()) e.message = 'پیام شما الزامی است'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">صفحه اصلی</Link>
            <span>/</span>
            <span>تماس</span>
          </div>
          <h1>تماس با ما</h1>
          <p>برای مشاوره، سفارش یا هر سوال دیگری با ما در ارتباط باشید. تیم ما آماده پاسخگویی به شماست.</p>
        </div>
      </div>

      <div className="container contact-page">
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>اطلاعات تماس</h2>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-info-label">تلفن</span>
                <span className="contact-info-value placeholder">[شماره تماس]</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">واتساپ</span>
                <span className="contact-info-value placeholder">[شماره واتساپ]</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">آدرس</span>
                <span className="contact-info-value placeholder">[آدرس نمایشگاه و کارگاه]</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">ساعات کاری</span>
                <span className="contact-info-value">شنبه تا پنجشنبه، ۹ تا ۱۸</span>
              </div>
            </div>
            <div className="contact-social">
              <a href="#" className="social-link">اینستاگرام</a>
              <a href="#" className="social-link">واتساپ</a>
              <a href="#" className="social-link">تلگرام</a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="form-success">
                <h3>پیام شما ارسال شد ✓</h3>
                <p>از تماس شما سپاسگزاریم. تیم ما در اولین فرصت با شما تماس خواهد گرفت.</p>
                <button className="btn btn-outline" onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', message: '' }) }}>
                  ارسال پیام جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <h2>پیام بگذارید</h2>
                <div className="form-group">
                  <label className="form-label">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    className="form-input"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">شماره تماس</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    dir="ltr"
                    placeholder="0912XXXXXXX"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">پیام شما</label>
                  <textarea
                    className="form-textarea"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">ارسال پیام</button>
                <p className="form-hint">اطلاعات شما محفوظ است و تنها برای پاسخگویی استفاده می‌شود.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
