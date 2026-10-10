import { brandStoryImage, featuredImage } from '@/data/products';

export default function AboutPage() {
  return (
    <div className="pt-[52px] lg:pt-[56px]">
      {/* Hero */}
      <div className="relative h-[280px] lg:h-[380px] overflow-hidden">
        <img src={featuredImage} alt="VLORÉ" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-3 font-medium">Our Story</p>
            <h1 className="font-serif text-4xl lg:text-5xl text-ivory font-light">About VLORÉ</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-14 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl text-ivory font-light mb-6">
            Less, But Better.
          </h2>
          <p className="text-sm lg:text-base text-muted leading-relaxed mb-4">
            VLORÉ was founded on a simple belief: that true luxury lies not in excess, but in restraint. We create timeless essentials for the modern wardrobe — pieces designed to endure beyond seasons, trends, and time itself.
          </p>
          <p className="text-sm lg:text-base text-muted leading-relaxed">
            Every garment begins with carefully sourced fabrics and ends with precise tailoring. Our commitment to considered design and lasting quality defines everything we create. We make fewer pieces, made better.
          </p>
        </div>

        <div className="relative overflow-hidden h-[320px] lg:h-[440px] mb-12">
          <img src={brandStoryImage} alt="VLORÉ craftsmanship" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Craftsmanship', text: 'Every piece is crafted with intention and precision.' },
            { title: 'Quality', text: 'Premium fabrics, ethically sourced and built to last.' },
            { title: 'Timelessness', text: 'Design that endures beyond seasons and trends.' },
          ].map(v => (
            <div key={v.title}>
              <h3 className="font-serif text-xl text-ivory mb-2">{v.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
