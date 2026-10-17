import { PrismaClient, Role, NewsStatus, AdPlacement } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const provinces = [
  { name: 'گیلان', slug: 'gilan' },
  { name: 'گلستان', slug: 'golestan' },
  { name: 'مازندران', slug: 'mazandaran' },
];

const counties: Record<string, { name: string; slug: string }[]> = {
  gilan: [
    { name: 'رشت', slug: 'rasht' },
    { name: 'بندر انزلی', slug: 'bandar-anzali' },
    { name: 'لاهیجان', slug: 'lahijan' },
    { name: 'آستارا', slug: 'astara' },
    { name: 'تالش', slug: 'talesh' },
    { name: 'صومعه‌سرا', slug: 'soumesara' },
    { name: 'رودبار', slug: 'roudbar' },
    { name: 'لنگرود', slug: 'langroud' },
  ],
  golestan: [
    { name: 'گرگان', slug: 'gorgan' },
    { name: 'گنبد کاووس', slug: 'gonbad' },
    { name: 'آق‌قلا', slug: 'aq-qala' },
    { name: 'بندر ترکمن', slug: 'bandar-torkaman' },
    { name: 'علی‌آباد کتول', slug: 'aliabad' },
    { name: 'کلاله', slug: 'kalaleh' },
    { name: 'مینودشت', slug: 'minudasht' },
    { name: 'آزادشهر', slug: 'azadshahr' },
  ],
  mazandaran: [
    { name: 'ساری', slug: 'sari' },
    { name: 'بابلسر', slug: 'babolsar' },
    { name: 'آمل', slug: 'amol' },
    { name: 'نوشهر', slug: 'nowshahr' },
    { name: 'قائم‌شهر', slug: 'qhaemshahr' },
    { name: 'تنکابون', slug: 'tonekabon' },
    { name: 'بهشهر', slug: 'behshahr' },
    { name: 'نکا', slug: 'neka' },
  ],
};

const categories = [
  { name: 'سیاسی', slug: 'political' },
  { name: 'اقتصادی', slug: 'economic' },
  { name: 'اجتماعی', slug: 'social' },
  { name: 'فرهنگی', slug: 'cultural' },
  { name: 'ورزشی', slug: 'sports' },
  { name: 'محیط زیست', slug: 'environment' },
  { name: 'کشاورزی', slug: 'agriculture' },
  { name: 'گردشگری', slug: 'tourism' },
  { name: 'آموزش', slug: 'education' },
  { name: 'بهداشت', slug: 'health' },
];

const img = (id: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${id}/${w}/${h}`;

// Pool of confirmed-working Unsplash photo IDs
const imgPool = [
  '1506905925346-21bda4d32df4',
  '1441974231531-c6227db76b6e',
  '1472214103451-9374bd1c798e',
  '1444703686981-a3abbc4d4fe3',
  '1433086966358-54859d0ed716',
  '1465056836041-7f43ac27dcb5',
  '1485470733090-0aae1788d5af',
  '1426604966848-d7adac402bff',
  '1493246507139-91e8fad9978e',
  '1490806843957-31f4c9a91c65',
  '1518398046578-8cca57782e17',
];

const newsTemplates = [
  { title: 'آغاز فصل برداشت برنج در شالیزارهای گیلان', summary: 'کشاورزان گیلانی با امید به برداشت پربار، فصل کاشت برنج را آغاز کردند.', cat: 'agriculture', prov: 'gilan', county: 'rasht', featured: true, breaking: false, img: '1574258498689-80f1bf3e8b39' },
  { title: 'افتتاح پروژه گردشگری ساحلی در بندر انزلی', summary: 'بزرگ‌ترین پروژه تفریحی-گردشگری سواحل خزر در بندر انزلی به بهره‌برداری رسید.', cat: 'tourism', prov: 'gilan', county: 'bandar-anzali', featured: true, breaking: false, img: '1507525428034-b7238cbb1d63' },
  { title: 'افزایش صادرات محصولات کشاورزی گلستان', summary: 'گلستان رکورد جدیدی در صادرات محصولات کشاورزی به کشورهای همسایه ثبت کرد.', cat: 'economic', prov: 'golestan', county: 'gorgan', featured: true, breaking: true, img: '1500382017468-9049fedbd479' },
  { title: 'جشنواره فرهنگی عشایر در گنبد کاووس برگزار شد', summary: 'هفتمین جشنواره فرهنگی عشایر ترکمن با حضور گسترده مردم در گنبد کاووس برگزار شد.', cat: 'cultural', prov: 'golestan', county: 'gonbad', featured: false, breaking: false, img: '1530648804-7e1e0a6e6f7e' },
  { title: 'بازسازی جنگل‌های هیرکانی در مازندران', summary: 'پروژه ملی بازسازی جنگل‌های باستانی هیرکانی در مازندران با موفقیت پیش می‌رود.', cat: 'environment', prov: 'mazandaran', county: 'sari', featured: true, breaking: false, img: '1448375240586-8627a304d6e0' },
  { title: 'تیم فوتبال ساری به فینال لیگ استانی رسید', summary: 'تیم فوتبال جوان ساری با شکست حریف خود به فینال لیگ استانی مازندران صعود کرد.', cat: 'sports', prov: 'mazandaran', county: 'sari', featured: false, breaking: false, img: '1551958219356-3a5e4c0b1d63' },
  { title: 'طرح توسعه بنادر صیادی در سواحل مازندران', summary: 'طرح جامع توسعه بنادر صیادی سواحل خزر با هدف حمایت از صیادان محلی آغاز شد.', cat: 'economic', prov: 'mazandaran', county: 'nowshahr', featured: false, breaking: false, img: '1544551767-4646a7ed4fb6' },
  { title: 'برگزاری نمایشگاه صنایع دستی لاهیجان', summary: 'نمایشگاه صنایع دستی لاهیجان با عرضه آثار هنرمندان محلی افتتاح شد.', cat: 'cultural', prov: 'gilan', county: 'lahijan', featured: false, breaking: false, img: '1567607069670-8f3d4c0b1d63' },
  { title: 'هشدار درباره آلودگی رودخانه گرگان‌رود', summary: 'کارشناسان محیط زیست نسبت به افزایش آلودگی گرگان‌رود هشدار دادند.', cat: 'environment', prov: 'golestan', county: 'gorgan', featured: false, breaking: true, img: '1473041659752-3e0a8e3e8b39' },
  { title: 'افتتاح بیمارستان جدید در آمل', summary: 'بیمارستان جدید شهر آمل با ظرفیت ۳۰۰ تخت به بهره‌برداری رسید.', cat: 'health', prov: 'mazandaran', county: 'amol', featured: false, breaking: false, img: '1519494026892-80bb6c0e8b39' },
  { title: 'جاده‌سازی در مناطق کوهستانی رودبار', summary: 'پروژه احداث جاده جدید در مناطق کوهستانی رودبار به مرحله پایانی رسید.', cat: 'social', prov: 'gilan', county: 'roudbar', featured: false, breaking: false, img: '1464822759023-fed622ff2c3a' },
  { title: 'مسابقه کتاب‌خوانی در مدارس بابلسر', summary: 'مسابقه کتاب‌خوانی دانش‌آموزی در مدارس بابلسر با مشارکت هزاران دانش‌آموز برگزار شد.', cat: 'education', prov: 'mazandaran', county: 'babolsar', featured: false, breaking: false, img: '1503676262389-8e1e0a6e6f7e' },
  { title: 'سرمایه‌گذاری جدید در حوزه ICT گیلان', summary: 'استان گیلان شاهد سرمایه‌گذاری جدید در حوزه فناوری اطلاعات و ارتباطات است.', cat: 'economic', prov: 'gilan', county: 'rasht', featured: false, breaking: false, img: '1454165244-8c6c6b1e8b39' },
  { title: 'حفاظت از تالاب بین‌المللی آستارا', summary: 'طرح جدید حفاظت از تالاب بین‌المللی آستارا با همکاری سازمان محیط زیست آغاز شد.', cat: 'environment', prov: 'gilan', county: 'astara', featured: false, breaking: false, img: '1473117137e1e0a6e6f7e' },
  { title: 'تورنمنت کشتی در مینودشت', summary: 'مسابقات کشتی فرنگی جوانان در مینودشت با حضور ورزشکاران برتر برگزار شد.', cat: 'sports', prov: 'golestan', county: 'minudasht', featured: false, breaking: false, img: '1551958219356-3a5e4c0b1d63' },
  { title: 'توسعه زیرساخت‌های گردشگری در تنکابون', summary: 'شهرداری تنکابون طرح توسعه زیرساخت‌های گردشگری ساحلی را کلید زد.', cat: 'tourism', prov: 'mazandaran', county: 'tonekabon', featured: false, breaking: false, img: '1507525428034-b7238cbb1d63' },
  { title: 'اجلاس مدیران آموزش و پرورش سه استان شمالی', summary: 'اجلاس مشترک مدیران آموزش و پرورش گیلان، گلستان و مازندران در ساری برگزار شد.', cat: 'education', prov: 'mazandaran', county: 'sari', featured: false, breaking: false, img: '1503676262389-8e1e0a6e6f7e' },
  { title: 'کشت محصولات گلخانه‌ای در علی‌آباد کتول', summary: 'توسعه کشت گلخانه‌ای در علی‌آباد کتول به افزایش تولید سبزیجات منجر شد.', cat: 'agriculture', prov: 'golestan', county: 'aliabad', featured: false, breaking: false, img: '1574258498689-80f1bf3e8b39' },
  { title: 'احیای بافت تاریخی لنگرود', summary: 'پروژه احیای بافت تاریخی شهر لنگرود با همکاری میراث فرهنگی آغاز شد.', cat: 'cultural', prov: 'gilan', county: 'langroud', featured: false, breaking: false, img: '1530648804-7e1e0a6e6f7e' },
  { title: 'افزایش ظرفیت تصفیه‌خانه آب قائم‌شهر', summary: 'طرح توسعه تصفیه‌خانه آب قائم‌شهر به منظور تامین آب شرب شهر تکمیل شد.', cat: 'social', prov: 'mazandaran', county: 'qhaemshahr', featured: false, breaking: false, img: '1464822759023-fed622ff2c3a' },
];

async function main() {
  // Check if already seeded
  const existing = await prisma.province.count();
  if (existing > 0) {
    console.log('Database already seeded, skipping.');
    return;
  }

  const passwordHash = await bcrypt.hash('123456', 10);

  // Create provinces
  const provinceMap: Record<string, any> = {};
  for (const p of provinces) {
    provinceMap[p.slug] = await prisma.province.create({ data: p });
  }

  // Create counties
  const countyMap: Record<string, any> = {};
  for (const [provSlug, list] of Object.entries(counties)) {
    for (const c of list) {
      const key = `${provSlug}:${c.slug}`;
      countyMap[key] = await prisma.county.create({
        data: { ...c, provinceId: provinceMap[provSlug].id },
      });
    }
  }

  // Create categories
  const catMap: Record<string, any> = {};
  for (const c of categories) {
    catMap[c.slug] = await prisma.category.create({ data: c });
  }

  // Create users
  const superAdmin = await prisma.user.create({
    data: { name: 'مدیر کل', email: 'admin@shomal.news', password: passwordHash, role: Role.SUPER_ADMIN },
  });

  const provAdminMap: Record<string, any> = {};
  for (const p of provinces) {
    provAdminMap[p.slug] = await prisma.user.create({
      data: {
        name: `مدیر استانی ${p.name}`,
        email: `admin-${p.slug}@shomal.news`,
        password: passwordHash,
        role: Role.PROVINCIAL_ADMIN,
        provinceId: provinceMap[p.slug].id,
      },
    });
  }

  // Create a few county supervisors
  const supervisorMap: Record<string, any> = {};
  const supervisorCounties = ['rasht', 'bandar-anzali', 'gorgan', 'gonbad', 'sari', 'amol'];
  for (const cs of supervisorCounties) {
    const provSlug = cs === 'rasht' || cs === 'bandar-anzali' ? 'gilan'
      : cs === 'gorgan' || cs === 'gonbad' ? 'golestan' : 'mazandaran';
    const countyKey = `${provSlug}:${cs}`;
    supervisorMap[cs] = await prisma.user.create({
      data: {
        name: `سرپرست ${countyMap[countyKey].name}`,
        email: `sup-${cs}@shomal.news`,
        password: passwordHash,
        role: Role.COUNTY_SUPERVISOR,
        provinceId: provinceMap[provSlug].id,
        countyId: countyMap[countyKey].id,
      },
    });
  }

  // Create news
  for (let i = 0; i < newsTemplates.length; i++) {
    const t = newsTemplates[i];
    const provSlug = t.prov;
    const countyKey = `${provSlug}:${t.county}`;
    const slug = `news-${i + 1}-${t.cat}`;
    const author = supervisorMap[t.county] || provAdminMap[provSlug] || superAdmin;
    await prisma.news.create({
      data: {
        title: t.title,
        slug,
        summary: t.summary,
        content: `${t.summary}\n\nدر همین راستا، مسئولان مربوطه اعلام کردند که این طرح با هدف بهبود وضعیت منطقه و رفاه شهروندان دنبال می‌شود. طبق اعلام مرکز روابط عمومی، این پروژه در چند مرحله اجرا خواهد شد و انتظار می‌رود در مدت زمان کوتاهی نتایج ملموس آن قابل مشاهده باشد.\n\nشایان ذکر است که این اقدام در راستای سیاست‌های توسعه پایدار منطقه‌ای صورت می‌گیرد و مورد استقبال مردم و کارشناسان قرار گرفته است. مسئولان وعده داده‌اند که پیوستگی در اجرای طرح‌های توسعه‌ای را با جدیت دنبال کنند.\n\nهمچنین اهالی منطقه خواستار تسریع در اجرای کامل این پروژه و رفع موانع احتمالی پیش‌رو شده‌اند. ناظران معتقدند که موفقیت این طرح می‌تواند الگویی برای سایر مناطق باشد.`,
        image: img(imgPool[i % imgPool.length]),
        gallery: [img(imgPool[i % imgPool.length]), img(imgPool[(i + 1) % imgPool.length]), img(imgPool[(i + 2) % imgPool.length])],
        categoryId: catMap[t.cat].id,
        provinceId: provinceMap[provSlug].id,
        countyId: countyMap[countyKey].id,
        authorId: author.id,
        status: NewsStatus.PUBLISHED,
        featured: t.featured,
        breaking: t.breaking,
        tags: [t.cat, provSlug, 'شمال ایران'],
        views: Math.floor(Math.random() * 5000) + 100,
        publishedAt: new Date(Date.now() - i * 3600000 * 6),
      },
    });
  }

  // Create ads
  await prisma.ad.createMany({
    data: [
      { title: 'تبلیغات بنر اصلی', image: img('1506905925346-21bda4d32df4', 1600, 400), link: '#', placement: AdPlacement.HERO_BANNER, priority: 10, active: true },
      { title: 'تبلیغات بین بخش‌ها', image: img('1441974231531-c6227db76b6e', 1200, 200), link: '#', placement: AdPlacement.BETWEEN_SECTIONS, priority: 5, active: true },
      { title: 'تبلیغات کنار خبر', image: img('1472214103451-9374bd1c798e', 400, 600), link: '#', placement: AdPlacement.ARTICLE_SIDEBAR, priority: 3, active: true },
      { title: 'تبلیغات موبایل', image: img('1444703686981-a3abbc4d4fe3', 600, 300), link: '#', placement: AdPlacement.MOBILE, priority: 1, active: true },
    ],
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
