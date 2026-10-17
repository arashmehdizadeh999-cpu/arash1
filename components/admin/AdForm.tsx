'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdForm({ provinces }: { provinces: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '', image: '', link: '#', placement: 'HERO_BANNER',
    priority: 0, active: true, startDate: '', endDate: '', provinceId: '', countyId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          startDate: form.startDate || null,
          endDate: form.endDate || null,
          provinceId: form.provinceId || null,
          countyId: form.countyId || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'خطا'); setLoading(false); return; }
      router.refresh();
      setForm({ title: '', image: '', link: '#', placement: 'HERO_BANNER', priority: 0, active: true, startDate: '', endDate: '', provinceId: '', countyId: '' });
    } catch { setError('خطا در ارتباط'); setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</div>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">عنوان *</label>
          <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">جایگاه *</label>
          <select value={form.placement} onChange={(e) => setForm({ ...form, placement: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50">
            <option value="HERO_BANNER">بنر اصلی</option>
            <option value="BETWEEN_SECTIONS">بین بخش‌ها</option>
            <option value="ARTICLE_SIDEBAR">کنار خبر</option>
            <option value="CATEGORY_PAGE">صفحه دسته‌بندی</option>
            <option value="MOBILE">موبایل</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-gray-400">آدرس تصویر *</label>
        <input type="url" required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} dir="ltr"
          className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50" placeholder="https://..." />
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-gray-400">لینک مقصد</label>
        <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} dir="ltr"
          className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50" placeholder="https://..." />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">استان هدف</label>
          <select value={form.provinceId} onChange={(e) => setForm({ ...form, provinceId: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50">
            <option value="">همه</option>
            {provinces.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">اولویت</label>
          <input type="number" value={form.priority} onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) || 0 })}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">شروع</label>
          <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} dir="ltr"
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">پایان</label>
          <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} dir="ltr"
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50" />
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })}
          className="h-4 w-4 rounded border-white/20 bg-navy-800 text-neon focus:ring-neon/50" />
        <span className="text-sm text-gray-300">فعال</span>
      </label>
      <button type="submit" disabled={loading}
        className="rounded-lg bg-neon px-6 py-2.5 text-sm font-bold text-navy-950 hover:bg-neon/90 transition-colors disabled:opacity-50">
        {loading ? 'در حال ذخیره...' : 'افزودن تبلیغ'}
      </button>
    </form>
  );
}
