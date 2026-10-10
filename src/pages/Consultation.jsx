import { useState } from 'react'
import { Link } from 'react-router-dom'
import { productCategories } from '../data/products'

export default function Consultation() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', phone: '', city: '', projectType: '', style: '', dimensions: '',
    material: '', budget: '', callTime: '', notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const totalSteps = 3

  const validateStep = (s) => {
    const e = {}
    if (s === 1) {
      if (!form.name.trim()) e.name = 'نام و نام خانوادگی الزامی است'
      if (!form.phone.trim()) e.phone = 'شماره تماس الزامی است'
      else if (!/^0?\d{10,11}$/.test(form.phone.replace(/[\s-]/g, ''))) e.phone = 'شماره تماس معتبر نیست'
      if (!form.city.trim()) e.city = 'شهر محل پروژه الزامی است'
    }
    if (s === 2) {
      if (!form.projectType) e.projectType = 'انتخاب نوع پروژه الزامی است'
      if (!form.style) e.style = 'انتخاب سبک موردعلاقه الزامی است'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validateStep(step)) setStep(s => Math.min(s + 1, totalSteps))
  }
  const prev = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(2)) setSubmitted(true)
  }

  const update = (key, val) => setForm({ ...form, [key]: val })

  if (submitted) {
    return (
      <div className="page">
        <div className="container consultation-success">
          <div className="form-success">
            <h2>درخواست شما ثبت شد ✓</h2>
            <p>از اعتماد شما سپاسگزاریم. کارشناسان ما در زمان مناسب برای تماس با شما، با شما تماس خواهند گرفت.</p>
            <Link to="/" className="btn btn-primary">بازگشت به صفحه اصلی</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">صفحه اصلی</Link>
            <span>/</span>
            <span>درخواست مشاوره</span>
          </div>
          <h1>درخواست مشاوره</h1>
          <p>فرم زیر را تکمیل کنید تا کارشناسان ما برای مشاوره تخصصی با شما تماس بگیرند.</p>
        </div>
      </div>

      <div className="container consultation-page">
        <div className="consultation-form-wrap">
          {/* Step Indicator */}
          <div className="step-indicator">
            {[1, 2, 3].map(n => (
              <div key={n} className={`step-indicator-item ${n === step ? 'active' : ''} ${n < step ? 'done' : ''}`}>
                <span className="step-indicator-num">{n}</span>
                <span className="step-indicator-label">
                  {n === 1 ? 'اطلاعات تماس' : n === 2 ? 'جزئیات پروژه' : 'تکمیلی'}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1 */}
            {step === 1 && (
              <div className="consultation-step">
                <h2>اطلاعات تماس</h2>
                <div className="form-group">
                  <label className="form-label">نام و نام خانوادگی *</label>
                  <input className="form-input" value={form.name} onChange={e => update('name', e.target.value)} />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">شماره تماس *</label>
                  <input className="form-input" type="tel" dir="ltr" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="0912XXXXXXX" />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">شهر محل پروژه *</label>
                  <input className="form-input" value={form.city} onChange={e => update('city', e.target.value)} />
                  {errors.city && <span className="form-error">{errors.city}</span>}
                </div>
                <div className="form-nav">
                  <button type="button" className="btn btn-primary" onClick={next}>مرحله بعد ←</button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="consultation-step">
                <h2>جزئیات پروژه</h2>
                <div className="form-group">
                  <label className="form-label">نوع پروژه *</label>
                  <div className="radio-grid">
                    {['بازسازی کامل', 'ساخت کابینت جدید', 'تعویض کابینت', 'طراحی فقط'].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        className={`radio-card ${form.projectType === opt ? 'selected' : ''}`}
                        onClick={() => update('projectType', opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.projectType && <span className="form-error">{errors.projectType}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">سبک موردعلاقه *</label>
                  <div className="radio-grid">
                    {productCategories.map(cat => (
                      <button
                        key={cat.slug}
                        type="button"
                        className={`radio-card ${form.style === cat.name ? 'selected' : ''}`}
                        onClick={() => update('style', cat.name)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  {errors.style && <span className="form-error">{errors.style}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">ابعاد تقریبی آشپزخانه</label>
                  <input className="form-input" value={form.dimensions} onChange={e => update('dimensions', e.target.value)} placeholder="مثال: ۳×۴ متر" />
                </div>
                <div className="form-nav">
                  <button type="button" className="btn btn-outline" onClick={prev}>→ مرحله قبل</button>
                  <button type="button" className="btn btn-primary" onClick={next}>مرحله بعد ←</button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="consultation-step">
                <h2>اطلاعات تکمیلی</h2>
                <div className="form-group">
                  <label className="form-label">متریال موردنظر</label>
                  <input className="form-input" value={form.material} onChange={e => update('material', e.target.value)} placeholder="مثال: MDF، چوب، های‌گلاس" />
                </div>
                <div className="form-group">
                  <label className="form-label">بودجه تقریبی (اختیاری)</label>
                  <input className="form-input" value={form.budget} onChange={e => update('budget', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">زمان مناسب برای تماس</label>
                  <input className="form-input" value={form.callTime} onChange={e => update('callTime', e.target.value)} placeholder="مثال: صبح‌ها ۹ تا ۱۲" />
                </div>
                <div className="form-group">
                  <label className="form-label">توضیحات تکمیلی</label>
                  <textarea className="form-textarea" value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="هر توضیح دیگری که لازم می‌دانید..." />
                </div>
                <div className="form-nav">
                  <button type="button" className="btn btn-outline" onClick={prev}>→ مرحله قبل</button>
                  <button type="submit" className="btn btn-primary">ثبت درخواست ✓</button>
                </div>
                <p className="form-hint">اطلاعات شما محفوظ است و تنها برای مشاوره و پاسخگویی استفاده می‌شود.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
