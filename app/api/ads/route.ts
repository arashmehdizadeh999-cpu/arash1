import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غیرمجاز' }, { status: 401 });

  if (session.role === 'COUNTY_SUPERVISOR') {
    return NextResponse.json({ error: 'سرپرست شهرستانی دسترسی به مدیریت تبلیغات ندارد' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, image, link, placement, priority, active, startDate, endDate, provinceId, countyId } = body;

    if (!title || !image || !placement) {
      return NextResponse.json({ error: 'فیلدهای الزامی ناقص است' }, { status: 400 });
    }

    const ad = await prisma.ad.create({
      data: {
        title, image, link: link || '#',
        placement,
        priority: priority || 0,
        active: active !== false,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        provinceId: provinceId || null,
        countyId: countyId || null,
      },
    });

    await prisma.activityLog.create({
      data: { userId: session.userId, action: 'CREATE_AD', details: `ایجاد تبلیغ: ${title}` },
    });

    return NextResponse.json({ ok: true, ad });
  } catch {
    return NextResponse.json({ error: 'خطا در ایجاد تبلیغ' }, { status: 500 });
  }
}
