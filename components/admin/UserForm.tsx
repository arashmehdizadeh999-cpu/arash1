'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserForm({ provinces, counties }: { provinces: any[]; counties: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'COUNTY_SUPERVISOR', provinceId: '', countyId: '',
  });

  const filteredCounties = counties.filter((c: any) => c.provinceId === form.provinceId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          provinceId: form.provinceId || null,
          countyId: form.countyId || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'خطا'); setLoading(false); return; }
      router.refresh();
      setForm({ name: '', email: '', password: '', role: 'COUNTY_SUPERVISOR', provinceId: '', countyId: '' });
    } catch { setError('خطا در ارتباط'); setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</div>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">نام *</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">ایمیل *</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} dir="ltr"
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">رمز عبور *</label>
          <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} dir="ltr"
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">نقش *</label>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value, countyId: '' })}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50">
            <option value="SUPER_ADMIN">مدیر کل</option>
            <option value="PROVINCIAL_ADMIN">مدیر استانی</option>
            <option value="COUNTY_SUPERVISOR">سرپرست شهرستانی</option>
          </select>
        </div>
        {form.role !== 'SUPER_ADMIN' && (
          <>
            <div>
              <label className="mb-1.5 block text-xs text-gray-400">استان</label>
              <select value={form.provinceId} onChange={(e) => setForm({ ...form, provinceId: e.target.value, countyId: '' })}
                className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50">
                <option value="">—</option>
                {provinces.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            {form.role === 'COUNTY_SUPERVISOR' && (
              <div>
                <label className="mb-1.5 block text-xs text-gray-400">شهرستان</label>
                <select value={form.countyId} onChange={(e) => setForm({ ...form, countyId: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50">
                  <option value="">—</option>
                  {filteredCounties.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            )}
          </>
        )}
      </div>
      <button type="submit" disabled={loading}
        className="rounded-lg bg-neon px-6 py-2.5 text-sm font-bold text-navy-950 hover:bg-neon/90 transition-colors disabled:opacity-50">
        {loading ? 'در حال ذخیره...' : 'افزودن کاربر'}
      </button>
    </form>
  );
}
