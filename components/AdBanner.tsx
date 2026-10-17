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
        className={`block overflow-hidden rounded-xl glass-card ${ratio}`}
      >
        <img src={ad.image} alt={ad.title} className="h-full w-full object-cover" loading="lazy" />
      </a>
    </div>
  );
}
