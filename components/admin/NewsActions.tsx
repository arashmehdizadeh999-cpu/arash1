'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewsActions({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('آیا از حذف این خبر مطمئن هستید؟')) return;
    setDeleting(true);
    try {
      await fetch(`/api/news/${id}`, { method: 'DELETE' });
      router.refresh();
    } catch {
      alert('خطا در حذف');
    }
    setDeleting(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/news/${id}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:text-neon hover:border-neon/30 transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:text-red-400 hover:border-red-500/30 transition-colors disabled:opacity-50"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      </button>
    </div>
  );
}
