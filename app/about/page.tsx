import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'درباره ما | اخبار شمال',
  description: 'معرفی سامانه خبری منطقه‌ای شمال ایران',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-start gap-3">
        <span className="neon-line h-12 w-1 rounded-full shrink-0"></span>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">درباره ما</h1>
          <p className="mt-1 text-sm text-gray-400">معرفی رسانه خبری شمال</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 text-sm leading-8 text-gray-300 sm:text-base">
        <p>
          «اخبار شمال» یک سامانه خبری منطقه‌ای است که با هدف پوشش جامع رویدادهای سه استان گیلان، گلستان و مازندران فعالیت می‌کند.
          این رسانه تلاش می‌کند اخبار محلی، شهرستانی و استانی را به‌صورت دقیق، بی‌طرفانه و به‌موقع در اختیار مخاطبان قرار دهد.
        </p>
        <p>
          ساختار این رسانه بر پایه سیستم مدیریت سلسله‌مراتبی استوار است: مدیر کل، مدیران استانی و سرپرستان شهرستانی.
          هر سرپرست شهرستان تنها در محدوده شهرستان خود اخبار را ثبت و مدیریت می‌کند و اخبار پیش از انتشار عمومی، در صورت نیاز، توسط مدیر بالادست تأیید می‌شوند.
        </p>
        <p>
          ما معتقدیم اخبار محلی، ستون فقرات آگاهی عمومی در مناطق مختلف کشور است و تلاش می‌کنیم با بهره‌گیری از فناوری‌های روز،
          تجربه‌ای مدرن و حرفه‌ای از پیگیری اخبار شمال ایران را برای شما فراهم کنیم.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { title: 'سه استان', desc: 'پوشش خبری گیلان، گلستان و مازندران' },
          { title: '۲۴ شهرستان', desc: 'سرپرستان خبری در شهرستان‌های منطقه' },
          { title: 'دسترسی سلسله‌مراتبی', desc: 'مدیریت متمرکز با پنل‌های اختصاصی' },
        ].map((item) => (
          <div key={item.title} className="glass-card rounded-xl p-5 text-center">
            <h3 className="mb-1 text-lg font-bold text-neon">{item.title}</h3>
            <p className="text-xs text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
