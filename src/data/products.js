// ============================================
// Product Data — کابینتو
// Editable demonstration data
// ============================================

export const productCategories = [
  { slug: 'modern', name: 'کابینت مدرن', description: 'خطوط تمیز، فرم‌های ساده و متریال‌های نوین' },
  { slug: 'neoclassic', name: 'کابینت نئوکلاسیک', description: 'تلفیقی از کلاسیک و مدرن با جزئیات ظریف' },
  { slug: 'classic', name: 'کابینت کلاسیک', description: 'طراحی‌های فاخر با کنده‌کاری و متریال‌های سنتی' },
  { slug: 'wood', name: 'کابینت چوبی', description: 'گرمای چوب طبیعی و روکش‌های باکیفیت' },
]

export const products = [
  {
    slug: 'tango-minimal',
    name: 'تانگو مینیمال',
    category: 'modern',
    categoryName: 'کابینت مدرن',
    code: 'TG-ML-01',
    shortDesc: 'فاسادهای صاف، هندسه ساده و نورپردازی اکسنت برای فضایی مینیمال و لوکس.',
    description: 'کالکسیون تانگو مینیمال با فاسادهای بدون فریم و رنگ مات، ترکیبی از سادگی و ظرافت را ارائه می‌دهد. این طراحی با خطوط افقی قوی و عدم استفاده از دستگیره، فضایی آرامش‌بخش و مدرن ایجاد می‌کند.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-b889f8f3a22d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600488999284-1cb3f7c7b94f?w=1200&q=80',
    ],
    materials: ['MDF', 'ماتیک رنگ پلی‌اورتان'],
    colors: ['گریج (خاکستری-بژ)', 'مشکی مات', 'سفید مات'],
    specs: {
      'نوع چیدمان': 'خطی + جزیره',
      'عرض': '۳۰۰۰-۳۶۰۰ میلی‌متر',
      'جزیره': '۲۲۰۰-۲۶۰۰ میلی‌متر',
      'ارتفاع کابینت‌های بالا': '۹۰۰ میلی‌متر',
      'عمق پایه': '۶۰۰ میلی‌متر',
      'تعداد فضای نشستن': '۳ نفر',
      'نوع فاساد': 'صاف، بدون فریم',
      'متریال': 'MDF',
      'پوشش': 'رنگ مات / پلاستیک مات',
      'نوع باز شدن': 'push-to-open',
    },
  },
  {
    slug: 'noir-architect',
    name: 'نوار معمار',
    category: 'modern',
    categoryName: 'کابینت مدرن',
    code: 'NR-AR-02',
    shortDesc: 'پروفایل‌های مشکی مات با جزایر سنگ مرمر و نورپردازی دراماتیک.',
    description: 'نوار معمار با تمرکز بر تضادهای بصری، کابینت‌های مشکی مات را با سطوح مرمر طبیعی ترکیب می‌کند. نورپردازی مخفی و خطوط معماری قوی، فضایی سینمایی و در عین حال کاربردی می‌سازد.',
    images: [
      'https://images.unsplash.com/photo-1565538810397-8b0c3b9f7f8d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe999c706?w=1200&q=80',
      'https://images.unsplash.com/photo-1583846552317-9a1c9d96e8c4?w=1200&q=80',
    ],
    materials: ['MDF', 'های‌گلاس'],
    colors: ['مشکی مات', 'زغالی', 'برنزی'],
    specs: {
      'نوع چیدمان': 'ال-شکل + جزیره',
      'عرض': '۳۲۰۰-۴۰۰۰ میلی‌متر',
      'متریال': 'MDF با روکش های‌گلاس',
      'پوشش': 'رنگ پلی‌اورتان مات',
      'نوع باز شدن': 'پروفایل یکپارچه',
    },
  },
  {
    slug: 'greige-soft',
    name: 'گریج نرم',
    category: 'neoclassic',
    categoryName: 'کابینت نئوکلاسیک',
    code: 'GR-SF-03',
    shortDesc: 'فاسادهای قاب‌دار با رنگ گریج نرم و جزئیات ظریف کلاسیک.',
    description: 'گریج نرم با قاب‌های ظریف و رنگ خاکستری-بژ، پلی بین سبک کلاسیک و مدرن می‌سازد. این طراحی برای آشپزخانه‌هایی که به دنبال ظرافت بدون ازدحام بصری هستند، ایده‌آل است.',
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80',
      'https://images.unsplash.com/photo-1571508601891-ca5a0d394555?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909195-95036d0e1c1d?w=1200&q=80',
    ],
    materials: ['MDF', 'رنگ پلی‌اورتان'],
    colors: ['گریج', 'کرم', 'سفید عاج'],
    specs: {
      'نوع چیدمان': 'خطی + جزیره',
      'نوع فاساد': 'قاب‌دار (شیکر)',
      'متریال': 'MDF',
      'پوشش': 'رنگ پلی‌اورتان مات',
    },
  },
  {
    slug: 'walnut-heritage',
    name: 'گردو میراث',
    category: 'wood',
    categoryName: 'کابینت چوبی',
    code: 'WL-HE-04',
    shortDesc: 'روکش چوب گردوی طبیعی با بافت گرم و رنگ‌های خاکی.',
    description: 'گردو میراث با روکش چوب گردوی طبیعی، گرمای چوب را با طراحی معاصر ترکیب می‌کند. هر قطعه چوب منحصربه‌فرد است و بافت طبیعی آن به فضای آشپزخانه شخصیت می‌بخشد.',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0fed5c3f1f1e?w=1200&q=80',
      'https://images.unsplash.com/photo-1616913291185-7edd54912c2e?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&q=80',
    ],
    materials: ['روکش چوب', 'چوب طبیعی'],
    colors: ['گردویی', 'عسلی', 'کاراملی'],
    specs: {
      'نوع چیدمان': 'خطی + جزیره',
      'متریال': 'روکش چوب گردو',
      'پوشش': 'روغن محافظ',
      'نوع باز شدن': 'دستگیره مخفی',
    },
  },
  {
    slug: 'classic-royal',
    name: 'کلاسیک سلطنتی',
    category: 'classic',
    categoryName: 'کابینت کلاسیک',
    code: 'CL-RY-05',
    shortDesc: 'کنده‌کاری‌های ظریف، قاب‌های برجسته و رنگ‌های فاخر.',
    description: 'کلاسیک سلطنتی با کنده‌کاری‌های دستی و قاب‌های برجسته، تجمل کابینت‌های سنتی را با کیفیت ساخت مدرن همراه می‌کند. این طراحی برای فضاهای وسیع و دکوراسیون لوکس مناسب است.',
    images: [
      'https://images.unsplash.com/photo-1616913291185-7edd54912c2e?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1571508601891-ca5a0d394555?w=1200&q=80',
    ],
    materials: ['MDF', 'رنگ پلی‌اورتان'],
    colors: ['سفید عاج', 'کرم', 'طلایی'],
    specs: {
      'نوع چیدمان': 'U-شکل',
      'نوع فاساد': 'قاب‌دار با کنده‌کاری',
      'متریال': 'MDF',
      'پوشش': 'رنگ پلی‌اورتان براق',
    },
  },
  {
    slug: 'oak-warmth',
    name: 'بلوط گرم',
    category: 'wood',
    categoryName: 'کابینت چوبی',
    code: 'OK-WM-06',
    shortDesc: 'روکش چوب بلوط با رنگ‌های گرم و بافت طبیعی.',
    description: 'بلوط گرم با روکش چوب بلوط طبیعی، ترکیبی از دوام و زیبایی را ارائه می‌دهد. بافت مشخص چوب بلوط و رنگ گرم آن، فضایی دلپذیر و در عین حال شیک می‌سازد.',
    images: [
      'https://images.unsplash.com/photo-1556911220-b889f8f3a22d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600488999284-1cb3f7c7b94f?w=1200&q=80',
      'https://images.unsplash.com/photo-1565538810397-8b0c3b9f7f8d?w=1200&q=80',
    ],
    materials: ['روکش چوب', 'چوب طبیعی'],
    colors: ['بلوطی', 'عسلی روشن', 'خاکی'],
    specs: {
      'نوع چیدوان': 'خطی',
      'متریال': 'روکش چوب بلوط',
      'پوشش': 'روغن محافظ مات',
    },
  },
  {
    slug: 'midnight-matte',
    name: 'نیمه‌شب مات',
    category: 'modern',
    categoryName: 'کابینت مدرن',
    code: 'MD-MT-07',
    shortDesc: 'کابینت‌های مشکی مات با جزیره بتنی و نورپردازی خطی.',
    description: 'نیمه‌شب مات با رنگ مشکی مات عمیق و جزیره بتنی، فضایی معماری و دراماتیک می‌سازد. نورپردازی خطی مخفی و سطوح مات، تضادهای بصری خیره‌کننده‌ای ایجاد می‌کنند.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe999c706?w=1200&q=80',
      'https://images.unsplash.com/photo-1565538810397-8b0c3b9f7f8d?w=1200&q=80',
      'https://images.unsplash.com/photo-1583846552317-9a1c9d96e8c4?w=1200&q=80',
    ],
    materials: ['MDF', 'بتن اکسپوز'],
    colors: ['مشکی مات', 'زغالی', 'خاکستری'],
    specs: {
      'نوع چیدمان': 'خطی + جزیره',
      'متریال': 'MDF',
      'پوشش': 'رنگ پلی‌اورتان مات',
      'جزیره': 'بتن اکسپوز',
    },
  },
  {
    slug: 'ivory-elegance',
    name: 'عاجی ظریف',
    category: 'neoclassic',
    categoryName: 'کابینت نئوکلاسیک',
    code: 'IV-EL-08',
    shortDesc: 'فاسادهای سفید عاجی با قاب‌های ظریف و دستگیره‌های برنجی.',
    description: 'عاجی ظریف با رنگ سفید عاج و قاب‌های نئوکلاسیک، ظرافت و سادگی را در کنار هم قرار می‌دهد. دستگیره‌های برنجی نقطه اکسنتی لوکسی به طراحی می‌بخشند.',
    images: [
      'https://images.unsplash.com/photo-1571508601891-ca5a0d394555?w=1200&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909195-95036d0e1c1d?w=1200&q=80',
    ],
    materials: ['MDF', 'رنگ پلی‌اورتان'],
    colors: ['سفید عاج', 'کرم', 'برنجی'],
    specs: {
      'نوع چیدمان': 'خطی + جزیره',
      'نوع فاساد': 'قاب‌دار نئوکلاسیک',
      'متریال': 'MDF',
      'پوشش': 'رنگ پلی‌اورتان مات',
    },
  },
]

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug)
}

export function getRelatedProducts(slug, limit = 3) {
  const product = getProductBySlug(slug)
  if (!product) return []
  return products.filter(p => p.category === product.category && p.slug !== slug).slice(0, limit)
}
