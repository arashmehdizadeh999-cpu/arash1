'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'خطا در ورود');
        setLoading(false);
        return;
      }
      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('خطا در ارتباط با سرور');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon/10 border border-neon/30">
            <span className="text-neon text-3xl font-bold">ش</span>
          </div>
          <h1 className="text-2xl font-bold text-white">پنل مدیریت اخبار شمال</h1>
          <p className="mt-2 text-sm text-gray-400">برای ورود اطلاعات کاربری خود را وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-xs text-gray-400">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
              className="w-full rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50"
              placeholder="admin@shomal.news"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-400">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir="ltr"
              className="w-full rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50"
              placeholder="••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neon py-2.5 text-sm font-bold text-navy-950 hover:bg-neon/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>

        <div className="mt-4 rounded-lg border border-white/5 bg-navy-850/50 p-3 text-center text-xs text-gray-500">
          <p>داده‌های نمونه برای ورود:</p>
          <p className="mt-1" dir="ltr">admin@shomal.news / 123456</p>
        </div>
      </div>
    </div>
  );
}
