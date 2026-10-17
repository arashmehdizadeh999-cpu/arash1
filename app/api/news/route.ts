import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غیرمجاز' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, summary, content, image, categoryId, provinceId, countyId, tags, status, featured, breaking, publishedAt } = body;

    if (!title || !summary || !content || !categoryId || !provinceId) {
      return NextResponse.json({ error: 'فیلدهای الزامی ناقص است' }, { status: 400 });
    }

    // Permission check
    let finalProvinceId = provinceId;
    let finalCountyId = countyId || null;

    if (session.role === 'COUNTY_SUPERVISOR') {
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if (!user || user.provinceId !== provinceId) {
        return NextResponse.json({ error: 'شما فقط می‌توانید برای استان خود خبر ثبت کنید' }, { status: 403 });
      }
      finalCountyId = user.countyId;
      // County supervisors can only submit as DRAFT or PENDING
      if (status === 'PUBLISHED') {
        return NextResponse.json({ error: 'سرپرست شهرستانی نمی‌تواند خبر را مستقیماً منتشر کند' }, { status: 403 });
      }
    } else if (session.role === 'PROVINCIAL_ADMIN') {
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if (!user || user.provinceId !== provinceId) {
        return NextResponse.json({ error: 'شما فقط می‌توانید برای استان خود خبر ثبت کنید' }, { status: 403 });
      }
    }

    const slug = `${slugify(title)}-${Date.now().toString(36)}`;

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        summary,
        content,
        image: image || 'https://images.unsplash.com/photo-1495020689067-9588540c0e3b?w=1200&h=800&fit=crop&q=80',
        gallery: image ? [image] : [],
        categoryId,
        provinceId: finalProvinceId,
        countyId: finalCountyId,
        authorId: session.userId,
        status: status || 'DRAFT',
        featured: featured || false,
        breaking: breaking || false,
        tags: tags || [],
        publishedAt: status === 'PUBLISHED' ? (publishedAt ? new Date(publishedAt) : new Date()) : (publishedAt ? new Date(publishedAt) : null),
        scheduledAt: status === 'SCHEDULED' && publishedAt ? new Date(publishedAt) : null,
      },
    });

    await prisma.activityLog.create({
      data: { userId: session.userId, action: 'CREATE_NEWS', details: `ایجاد خبر: ${title}` },
    });

    return NextResponse.json({ ok: true, news });
  } catch (e) {
    return NextResponse.json({ error: 'خطا در ایجاد خبر' }, { status: 500 });
  }
}
