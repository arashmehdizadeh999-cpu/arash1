import { brandStoryImage } from '@/data/products';

export default function BrandStory() {
  return (
    <section className="py-14 lg:py-20 border-t border-subtle/30">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative overflow-hidden h-[300px] lg:h-[460px] order-2 lg:order-1">
            <img
              src={brandStoryImage}
              alt="VLORÉ craftsmanship"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-3 font-medium">
              Our Philosophy
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-ivory font-light leading-tight mb-5">
              Less, But Better.
            </h2>
            <p className="text-sm lg:text-base text-muted leading-relaxed mb-4">
              At VLORÉ, we believe in the power of restraint. Every piece is crafted with intention — designed to endure beyond seasons, trends, and time itself.
            </p>
            <p className="text-sm lg:text-base text-muted leading-relaxed">
              From carefully sourced fabrics to precise tailoring, our commitment to considered design and lasting quality defines everything we create. We make fewer pieces, made better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
