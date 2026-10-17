import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غیرمجاز' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, summary, content, image, categoryId, provinceId, countyId, tags, status, featured, breaking, publishedAt, gallery } = body;

    const existing = await prisma.news.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'خبر یافت نشد' }, { status: 404 });

    // Permission check
    if (session.role === 'COUNTY_SUPERVISOR') {
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if (!user || existing.provinceId !== user.provinceId) {
        return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 });
      }
    } else if (session.role === 'PROVINCIAL_ADMIN') {
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if (!user || existing.provinceId !== user.provinceId) {
        return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 });
      }
    }

    const updated = await prisma.news.update({
      where: { id: params.id },
      data: {
        title, summary, content,
        image: image || existing.image,
        gallery: gallery || existing.gallery,
        categoryId, provinceId, countyId: countyId || null,
        tags: tags || [],
        status,
        featured: featured || false,
        breaking: breaking || false,
        publishedAt: status === 'PUBLISHED' ? (publishedAt ? new Date(publishedAt) : existing.publishedAt || new Date()) : null,
        scheduledAt: status === 'SCHEDULED' && publishedAt ? new Date(publishedAt) : null,
      },
    });

    await prisma.activityLog.create({
      data: { userId: session.userId, action: 'UPDATE_NEWS', details: `ویرایش خبر: ${title}` },
    });

    return NextResponse.json({ ok: true, news: updated });
  } catch {
    return NextResponse.json({ error: 'خطا در ویرایش خبر' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غیرمجاز' }, { status: 401 });

  try {
    const existing = await prisma.news.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'خبر یافت نشد' }, { status: 404 });

    if (session.role === 'COUNTY_SUPERVISOR') {
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if (!user || existing.provinceId !== user.provinceId) {
        return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 });
      }
    } else if (session.role === 'PROVINCIAL_ADMIN') {
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if (!user || existing.provinceId !== user.provinceId) {
        return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 });
      }
    }

    await prisma.news.delete({ where: { id: params.id } });

    await prisma.activityLog.create({
      data: { userId: session.userId, action: 'DELETE_NEWS', details: `حذف خبر: ${existing.title}` },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطا در حذف خبر' }, { status: 500 });
  }
}
