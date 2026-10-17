'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface NewsFormProps {
  provinces: any[];
  counties: any[];
  categories: any[];
  news?: any;
  userRole?: string;
  userProvinceId?: string;
  userCountyId?: string;
}

export default function NewsForm({ provinces, counties, categories, news, userRole, userProvinceId, userCountyId }: NewsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagsInput, setTagsInput] = useState(news?.tags?.join(', ') || '');

  const [form, setForm] = useState({
    title: news?.title || '',
    summary: news?.summary || '',
    content: news?.content || '',
    image: news?.image || '',
    categoryId: news?.categoryId || categories[0]?.id || '',
    provinceId: news?.provinceId || userProvinceId || provinces[0]?.id || '',
    countyId: news?.countyId || userCountyId || '',
    status: news?.status || 'DRAFT',
    featured: news?.featured || false,
    breaking: news?.breaking || false,
    publishedAt: news?.publishedAt ? new Date(news.publishedAt).toISOString().slice(0, 16) : '',
  });

  const filteredCounties = counties.filter((c: any) => c.provinceId === form.provinceId);
  const canPublish = userRole === 'SUPER_ADMIN' || userRole === 'PROVINCIAL_ADMIN';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
        gallery: form.image ? [form.image] : [],
      };
      const url = news ? `/api/news/${news.id}` : '/api/news';
      const method = news ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'خطا در ذخیره‌سازی');
        setLoading(false);
        return;
      }
      router.push('/admin/news');
      router.refresh();
    } catch {
      setError('خطا در ارتباط با سرور');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

      <div>
        <label className="mb-1.5 block text-xs text-gray-400">عنوان خبر *</label>
        <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50" placeholder="عنوان خبر..." />
      </div>

      <div>
        <label className="mb-1.5 block text-xs text-gray-400">خلاصه *</label>
        <textarea required rows={2} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50 resize-none" placeholder="خلاصه خبر..." />
      </div>

      <div>
        <label className="mb-1.5 block text-xs text-gray-400">متن کامل *</label>
        <textarea required rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50 resize-y leading-8" placeholder="متن کامل خبر..." />
      </div>

      <div>
        <label className="mb-1.5 block text-xs text-gray-400">آدرس تصویر</label>
        <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} dir="ltr"
          className="w-full rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50" placeholder="https://..." />
        {form.image && <div className="relative mt-2 h-32 w-full overflow-hidden rounded-lg">
          <Image fill src={form.image} alt="preview" sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
        </div>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">دسته‌بندی *</label>
          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2.5 text-sm text-white outline-none focus:border-neon/50">
            {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">استان *</label>
          <select value={form.provinceId} onChange={(e) => setForm({ ...form, provinceId: e.target.value, countyId: '' })}
            disabled={userRole === 'COUNTY_SUPERVISOR' || userRole === 'PROVINCIAL_ADMIN'}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2.5 text-sm text-white outline-none focus:border-neon/50 disabled:opacity-60">
            {provinces.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">شهرستان</label>
          <select value={form.countyId} onChange={(e) => setForm({ ...form, countyId: e.target.value })}
            disabled={userRole === 'COUNTY_SUPERVISOR'}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2.5 text-sm text-white outline-none focus:border-neon/50 disabled:opacity-60">
            <option value="">—</option>
            {filteredCounties.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs text-gray-400">برچسب‌ها (با کاما جدا کنید)</label>
        <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50" placeholder="گیلان, کشاورزی, ..." />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">وضعیت</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2.5 text-sm text-white outline-none focus:border-neon/50">
            <option value="DRAFT">پیش‌نویس</option>
            <option value="PENDING">ارسال برای تأیید</option>
            {canPublish && <option value="PUBLISHED">انتشار</option>}
            {canPublish && <option value="SCHEDULED">زمان‌بندی</option>}
          </select>
        </div>
        {form.status === 'SCHEDULED' && (
          <div>
            <label className="mb-1.5 block text-xs text-gray-400">تاریخ انتشار</label>
            <input type="datetime-local" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} dir="ltr"
              className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2.5 text-sm text-white outline-none focus:border-neon/50" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="h-4 w-4 rounded border-white/20 bg-navy-800 text-neon focus:ring-neon/50" />
          <span className="text-sm text-gray-300">خبر مهم/منتخب</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.breaking} onChange={(e) => setForm({ ...form, breaking: e.target.checked })}
            className="h-4 w-4 rounded border-white/20 bg-navy-800 text-neon focus:ring-neon/50" />
          <span className="text-sm text-gray-300">خبر فوری</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="rounded-lg bg-neon px-6 py-2.5 text-sm font-bold text-navy-950 hover:bg-neon/90 transition-colors disabled:opacity-50">
          {loading ? 'در حال ذخیره...' : news ? 'ذخیره تغییرات' : 'ذخیره خبر'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="rounded-lg border border-white/10 px-6 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors">
          انصراف
        </button>
      </div>
    </form>
  );
}
