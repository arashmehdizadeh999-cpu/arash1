import Link from 'next/link';
import { InstagramIcon, TwitterIcon, FacebookIcon } from './Icons';

const footerColumns = [
  {
    title: 'SHOP',
    links: [
      { label: 'Men', href: '/shop?category=Men' },
      { label: 'Women', href: '/shop?category=Women' },
      { label: 'Tops', href: '/shop?category=Tops' },
      { label: 'Accessories', href: '/shop?category=Accessories' },
      { label: 'New Arrivals', href: '/shop' },
    ],
  },
  {
    title: 'INFORMATION',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Shipping', href: '/contact' },
      { label: 'Returns', href: '/contact' },
      { label: 'FAQs', href: '/contact' },
    ],
  },
  {
    title: 'CUSTOMER CARE',
    links: [
      { label: 'Size Guide', href: '/contact' },
      { label: 'Order Tracking', href: '/contact' },
      { label: 'Privacy Policy', href: '/contact' },
      { label: 'Terms', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-header border-t border-subtle/50 mt-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <span className="font-serif text-2xl tracking-[0.25em] text-ivory font-medium">
              VLOR<span className="text-gold">É</span>
            </span>
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              Modern luxury, timeless essentials. Premium craftsmanship and considered design for the modern wardrobe.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-muted hover:text-gold transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted hover:text-gold transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="text-muted hover:text-gold transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map(col => (
            <div key={col.title}>
              <h4 className="text-[11px] font-medium tracking-[0.15em] text-ivory uppercase mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-subtle/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted/70 tracking-wide">
            © 2026 VLORÉ. All rights reserved.
          </p>
          <p className="text-xs text-muted/70 tracking-wide">
            Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
