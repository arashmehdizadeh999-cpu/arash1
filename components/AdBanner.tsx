import Image from 'next/image';

interface AdBannerProps {
  ad: {
    id: string;
    title: string;
    image: string;
    link: string;
  } | null;
  className?: string;
  ratio?: string;
}

export default function AdBanner({ ad, className = '', ratio = 'aspect-[16/5]' }: AdBannerProps) {
  if (!ad) return null;
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative block overflow-hidden rounded-xl glass-card ${ratio}`}
      >
        <Image fill src={ad.image} alt={ad.title} sizes="(max-width: 768px) 100vw, 1200px" className="object-cover" />
      </a>
    </div>
  );
}
