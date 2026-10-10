import Link from 'next/link';
import { heroImage } from '@/data/products';
import { ArrowIcon } from './Icons';

export default function Hero() {
  return (
    <section className="relative w-full h-[340px] sm:h-[380px] lg:h-[420px] overflow-hidden mt-[52px] lg:mt-[56px]">
      {/* Background image */}
      <img
        src={heroImage}
        alt="VLORÉ campaign — model in a tan jacket"
        className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
      />
      {/* Left-side gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/30 to-transparent" />

      {/* Content */}
      <div className="relative h-full mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-center h-full">
          <div className="max-w-md fade-in-up">
            <p className="text-[11px] tracking-[0.25em] text-gold uppercase mb-4 font-medium">
              New Collection
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[1.05] font-light mb-4">
              Timeless
              <br />
              By Nature
            </h1>
            <p className="text-sm lg:text-base text-muted leading-relaxed mb-6 max-w-sm">
              Premium essentials crafted for the modern wardrobe.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gold text-bg-dark text-[11px] font-semibold tracking-[0.15em] uppercase px-7 py-3 hover:bg-[#D4B87A] transition-colors duration-200"
            >
              Shop Now
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
