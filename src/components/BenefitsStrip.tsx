import { LeafIcon, DiamondIcon, PackageIcon } from './Icons';

const benefits = [
  {
    icon: LeafIcon,
    title: 'PREMIUM FABRICS',
    description: 'Carefully selected materials',
  },
  {
    icon: DiamondIcon,
    title: 'TIMELESS DESIGN',
    description: 'Built to last beyond trends',
  },
  {
    icon: PackageIcon,
    title: 'WORLDWIDE SHIPPING',
    description: 'Delivering luxury anywhere',
  },
];

export default function BenefitsStrip() {
  return (
    <section className="bg-bg-secondary border-y border-subtle/40">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-subtle/40">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="flex items-center justify-center gap-3 py-5 sm:py-6 px-4"
              >
                <Icon className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-[10px] tracking-[0.15em] text-ivory uppercase font-medium">
                    {b.title}
                  </p>
                  <p className="text-[11px] text-muted/80 mt-0.5">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
