'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdActions({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      await fetch(`/api/ads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      router.refresh();
    } catch { alert('خطا'); }
    setLoading(false);
  };

  const del = async () => {
    if (!confirm('حذف این تبلیغ؟')) return;
    setLoading(true);
    try {
      await fetch(`/api/ads/${id}`, { method: 'DELETE' });
      router.refresh();
    } catch { alert('خطا'); }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={toggle} disabled={loading} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:text-neon hover:border-neon/30 transition-colors disabled:opacity-50">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
      </button>
      <button onClick={del} disabled={loading} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:text-red-400 hover:border-red-500/30 transition-colors disabled:opacity-50">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      </button>
    </div>
  );
}
