import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تماس با ما | اخبار شمال',
  description: 'راه‌های ارتباطی با سامانه خبری شمال',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-start gap-3">
        <span className="neon-line h-12 w-1 rounded-full shrink-0"></span>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">تماس با ما</h1>
          <p className="mt-1 text-sm text-gray-400">راه‌های ارتباطی با تحریریه اخبار شمال</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-6 space-y-5">
          <h2 className="text-lg font-bold text-white">اطلاعات تماس</h2>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-neon/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <div className="font-medium text-white">آدرس</div>
                <div className="text-gray-400">رشت، گیلان، ایران</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-neon/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <div className="font-medium text-white">تلفن</div>
                <div className="text-gray-400" dir="ltr">013-12345678</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-neon/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
              <div>
                <div className="font-medium text-white">ایمیل</div>
                <div className="text-gray-400" dir="ltr">info@shomal.news</div>
              </div>
            </div>
          </div>
        </div>

        <form className="glass-card rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">فرم تماس</h2>
          <div>
            <label className="mb-1.5 block text-xs text-gray-400">نام و نام خانوادگی</label>
            <input type="text" className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50" placeholder="نام شما" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-400">ایمیل</label>
            <input type="email" className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50" placeholder="email@example.com" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-400">پیام</label>
            <textarea rows={4} className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50 resize-none" placeholder="پیام شما..."></textarea>
          </div>
          <button type="submit" className="w-full rounded-lg bg-neon py-2.5 text-sm font-bold text-navy-950 hover:bg-neon/90 transition-colors">ارسال پیام</button>
        </form>
      </div>
    </div>
  );
}
