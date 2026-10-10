import { useReveal } from '../components/useReveal'

export default function DesignPhilosophy() {
  const { ref, visible } = useReveal()
  return (
    <section className="philosophy-section" ref={ref}>
      <div className="container">
        <div className={`philosophy-grid reveal ${visible ? 'visible' : ''}`}>
          <div className="philosophy-img img-zoom">
            <img
              src="https://images.unsplash.com/photo-1600488999284-1cb3f7c7b94f?w=1000&q=80"
              alt="آشپزخانه مدرن با نورپردازی دراماتیک"
              loading="lazy"
            />
          </div>
          <div className="philosophy-text">
            <span className="eyebrow">فلسفه طراحی</span>
            <h2 className="section-title">زیبایی در جزئیات شکل می‌گیرد</h2>
            <p className="body-text">
              ما معتقدیم یک کابینت خوب فقط زیبا نیست؛ باید دقیق، کاربردی و ماندگار باشد. هر پروژه با اندازه‌گیری دقیق آغاز می‌شود، با طراحی متناسب با فضای شما ادامه می‌یابد و با انتخاب آگاهانه متریال و اجرای حرفه‌ای به نتیجه می‌رسد.
            </p>
            <p className="body-text">
              تمرکز ما بر جزئیات اجرایی است — از فاصله دقیق بین کشوها تا یکپارچگی درزها. این توجه به جزئیات است که تفاوت بین یک کابینت معمولی و یک اثر ماندگار را رقم می‌زند.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
