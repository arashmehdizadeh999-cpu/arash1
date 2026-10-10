import { Link } from 'react-router-dom'
import { processSteps, whyChooseUs } from '../data/site'
import ConsultationCTA from '../components/ConsultationCTA'

export default function About() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">صفحه اصلی</Link>
            <span>/</span>
            <span>درباره ما</span>
          </div>
          <h1>درباره کابینتو</h1>
          <p>ما به ساخت کابینت‌های سفارشی با نگاهی معمارانه و عشق به جزئیات می‌پردازیم.</p>
        </div>
      </div>

      <div className="container about-page">
        {/* Story */}
        <section className="about-story">
          <div className="about-story-img img-zoom">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80"
              alt="کارگاه کابینت‌سازی کابینتو"
              loading="lazy"
            />
          </div>
          <div className="about-story-text">
            <span className="eyebrow">داستان ما</span>
            <h2 className="section-title">کابینتو؛ جایی که هنر و مهارت به هم می‌رسند</h2>
            <p className="body-text">
              کابینتو با هدف ارائه کابینت‌های سفارشی با کیفیت معماری شکل گرفت. ما معتقدیم آشپزخانه فقط فضایی برای پخت و پز نیست؛ قلب خانه و جایی است که زیبایی و کارایی باید در کنار هم باشند.
            </p>
            <p className="body-text">
              هر پروژه در کابینتو با مشاوره دقیق آغاز می‌شود، با طراحی متناسب با فضای شما ادامه می‌یابد و با متریال‌های درجه یک و اجرای حرفه‌ای به نتیجه می‌رسد. تیم ما از طراحان و صنعتکاران باتجربه تشکیل شده است که به جزئیات اهمیت می‌دهند.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="about-philosophy">
          <span className="eyebrow">فلسفه طراحی</span>
          <h2 className="section-title">زیبایی در جزئیات شکل می‌گیرد</h2>
          <p className="body-text">
            ما به سادگی، دقت و ماندگاری اعتقاد داریم. هر کابینت باید نه تنها زیبا، بلکه کاربردی و ماندگار باشد. این فلسفه در هر مرحله از کار ما — از انتخاب متریال تا نصب نهایی — بازتاب می‌یابد.
          </p>
        </section>

        {/* Workshop */}
        <section className="about-workshop">
          <div className="workshop-grid">
            <div className="img-zoom workshop-img">
              <img src="https://images.unsplash.com/photo-1600488999284-1cb3f7c7b94f?w=800&q=80" alt="کارگاه ساخت کابینت" loading="lazy" />
            </div>
            <div className="img-zoom workshop-img">
              <img src="https://images.unsplash.com/photo-1556911220-b889f8f3a22d?w=800&q=80" alt="جزئیات ساخت کابینت" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="about-process">
          <span className="eyebrow">فرآیند کار</span>
          <h2 className="section-title">از ایده تا اجرا</h2>
          <div className="about-process-grid">
            {processSteps.map((step, i) => (
              <div key={i} className="about-process-step">
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="about-values">
          <span className="eyebrow">ارزش‌های ما</span>
          <h2 className="section-title">آنچه ما را متمایز می‌کند</h2>
          <div className="why-grid">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="why-card">
                <div className="why-icon"><span>{String(i + 1).padStart(2, '0')}</span></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ConsultationCTA />
    </div>
  )
}
