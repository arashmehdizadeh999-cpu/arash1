import Link from 'next/link';
import { ArrowIcon } from '@/components/Icons';

const articles = [
  {
    title: 'The Art of Quiet Luxury',
    excerpt: 'How understated elegance is redefining modern menswear and the way we think about dressing.',
    category: 'Style',
    image: 'https://images.unsplash.com/photo-1619603364904-c0498317e145?auto=format&fit=crop&w=800&q=80',
    date: 'October 2026',
  },
  {
    title: 'Crafting Timeless Essentials',
    excerpt: 'A behind-the-scenes look at our design process, from fabric selection to final stitch.',
    category: 'Craft',
    image: 'https://images.unsplash.com/photo-1602346733051-b660c8747610?auto=format&fit=crop&w=800&q=80',
    date: 'September 2026',
  },
  {
    title: 'The Modern Wardrobe',
    excerpt: 'Building a capsule collection that transcends seasons — the VLORÉ approach to considered dressing.',
    category: 'Edit',
    image: 'https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?auto=format&fit=crop&w=800&q=80',
    date: 'September 2026',
  },
];

export default function JournalPage() {
  return (
    <div className="pt-[52px] lg:pt-[56px]">
      <div className="py-10 lg:py-14 text-center border-b border-subtle/30">
        <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-2 font-medium">Editorial</p>
        <h1 className="font-serif text-3xl lg:text-4xl text-ivory font-light">The Journal</h1>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {articles.map(a => (
            <Link href="/journal" key={a.title} className="group">
              <div className="relative overflow-hidden aspect-[4/5] bg-bg-secondary mb-4">
                <img
                  src={a.image}
                  alt={a.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-[10px] tracking-[0.15em] text-gold uppercase mb-2">{a.category} · {a.date}</p>
              <h2 className="font-serif text-xl lg:text-2xl text-ivory font-light mb-2 group-hover:text-gold transition-colors">
                {a.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{a.excerpt}</p>
              <p className="text-[11px] tracking-[0.15em] text-muted group-hover:text-gold uppercase mt-3 flex items-center gap-1 transition-colors">
                Read More <ArrowIcon className="w-3 h-3" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
