import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غیرمجاز' }, { status: 401 });

  if (session.role === 'COUNTY_SUPERVISOR') {
    return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, email, password, role, provinceId, countyId } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'فیلدهای الزامی ناقص است' }, { status: 400 });
    }

    // Permission checks
    if (session.role === 'PROVINCIAL_ADMIN') {
      // Provincial admin can only create county supervisors for their province
      if (role !== 'COUNTY_SUPERVISOR') {
        return NextResponse.json({ error: 'مدیر استانی فقط می‌تواند سرپرست شهرستانی ایجاد کند' }, { status: 403 });
      }
      const adminUser = await prisma.user.findUnique({ where: { id: session.userId } });
      if (!adminUser || adminUser.provinceId !== provinceId) {
        return NextResponse.json({ error: 'فقط برای استان خود می‌توانید کاربر ایجاد کنید' }, { status: 403 });
      }
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'این ایمیل قبلاً ثبت شده است' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role, provinceId: provinceId || null, countyId: countyId || null },
    });

    await prisma.activityLog.create({
      data: { userId: session.userId, action: 'CREATE_USER', details: `ایجاد کاربر: ${name} (${role})` },
    });

    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch {
    return NextResponse.json({ error: 'خطا در ایجاد کاربر' }, { status: 500 });
  }
}
