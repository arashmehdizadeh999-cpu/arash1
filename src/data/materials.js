// ============================================
// Materials Data — کابینتو
// ============================================

export const materialCategories = [
  { slug: 'facade', name: 'متریال فاساد' },
  { slug: 'countertop', name: 'صفحه کابینت' },
  { slug: 'finish', name: 'نوع پرداخت' },
]

export const materials = [
  {
    slug: 'mdf',
    name: 'MDF',
    category: 'facade',
    categoryName: 'متریال فاساد',
    description: 'صفحات MDF با چگالی بالا، پایداری ابعادی عالی و سطحی صاف برای رنگ‌آمیزی یا روکش‌کاری. مناسب‌ترین گزینه برای فاسادهای مدرن.',
    colors: ['#D0C2AD', '#777066', '#383633', '#F1EDE5'],
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
  },
  {
    slug: 'highgloss',
    name: 'های‌گلاس',
    category: 'facade',
    categoryName: 'متریال فاساد',
    description: 'روکش پلیمری با سطح براق و انعکاس بالا. ظاهری لوکس و مدرن با قابلیت تمیزکاری آسان.',
    colors: ['#F1EDE5', '#D0C2AD', '#242321', '#B7B0A5'],
    image: 'https://images.unsplash.com/photo-1556911220-b889f8f3a22d?w=800&q=80',
  },
  {
    slug: 'wood-veneer',
    name: 'روکش چوب',
    category: 'facade',
    categoryName: 'متریال فاساد',
    description: 'روکش چوب طبیعی با بافت واقعی چوب. گرمای چوب طبیعی با هزینه و نگهداری منطقی‌تر.',
    colors: ['#8B6F47', '#A0805A', '#6B4E2E', '#C4A06A'],
    image: 'https://images.unsplash.com/photo-1600210492493-0fed5c3f1f1e?w=800&q=80',
  },
  {
    slug: 'natural-wood',
    name: 'چوب طبیعی',
    category: 'facade',
    categoryName: 'متریال فاساد',
    description: 'چوب تمام‌طبیعی با کیفیت بالا. هر قطعه منحصربه‌فرد با بافت و رنگ طبیعی خود.',
    colors: ['#6B4E2E', '#8B6F47', '#4A3520', '#A0805A'],
    image: 'https://images.unsplash.com/photo-1616913291185-7edd54912c2e?w=800&q=80',
  },
  {
    slug: 'polyurethane',
    name: 'رنگ پلی‌اورتان',
    category: 'finish',
    categoryName: 'نوع پرداخت',
    description: 'رنگ پلی‌اورتان با دوام بالا، مقاومت در برابر رطوبت و رنگ‌آمیزی یکپارچه. قابل اجرا در مات، براق و نیمه‌براق.',
    colors: ['#171715', '#D0C2AD', '#F1EDE5', '#777066'],
    image: 'https://images.unsplash.com/photo-1571508601891-ca5a0d394555?w=800&q=80',
  },
  {
    slug: 'marble',
    name: 'سنگ مرمر',
    category: 'countertop',
    categoryName: 'صفحه کابینت',
    description: 'سنگ مرمر طبیعی با رگه‌های منحصربه‌فرد. زیبایی بی‌نظیر و مقاومت حرارتی بالا.',
    colors: ['#F1EDE5', '#D0C2AD', '#B7B0A5', '#E8E0D0'],
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&q=80',
  },
  {
    slug: 'quartz',
    name: 'کوارتز',
    category: 'countertop',
    categoryName: 'صفحه کابینت',
    description: 'صفحات مهندسی‌شده کوارتز با دوام فوق‌العاده و تنوع رنگی گسترده. مقاوم در برابر خط و لک.',
    colors: ['#242321', '#383633', '#D0C2AD', '#F1EDE5'],
    image: 'https://images.unsplash.com/photo-1583846552317-9a1c9d96e8c4?w=800&q=80',
  },
  {
    slug: 'concrete',
    name: 'بتن اکسپوز',
    category: 'countertop',
    categoryName: 'صفحه کابینت',
    description: 'سطح بتنی اکسپوز با ظاهری صنعتی و معماری. مناسب برای فضاهای مدرن و لفت.',
    colors: ['#383633', '#45423D', '#777066', '#242321'],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe999c706?w=800&q=80',
  },
]
