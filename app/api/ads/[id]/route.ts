import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غیرمجاز' }, { status: 401 });

  if (session.role === 'COUNTY_SUPERVISOR') {
    return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, image, link, placement, priority, active, startDate, endDate, provinceId, countyId } = body;

    const ad = await prisma.ad.update({
      where: { id: params.id },
      data: {
        title, image, link: link || '#',
        placement, priority: priority || 0,
        active: active !== false,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        provinceId: provinceId || null,
        countyId: countyId || null,
      },
    });

    return NextResponse.json({ ok: true, ad });
  } catch {
    return NextResponse.json({ error: 'خطا در ویرایش تبلیغ' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غیرمجاز' }, { status: 401 });

  if (session.role === 'COUNTY_SUPERVISOR') {
    return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 });
  }

  try {
    await prisma.ad.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطا در حذف تبلیغ' }, { status: 500 });
  }
}
