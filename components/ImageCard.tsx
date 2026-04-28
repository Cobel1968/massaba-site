import Image from 'next/image';
interface ImageCardProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
}
export default function ImageCard({ src, alt, title, description, className = '' }: ImageCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}>
      <div className="relative pb-[75%]"> {/* 4:3 aspect ratio - adjust to 56.25% for 16:9 */}
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {(title || description) && (
        <div className="p-4 bg-white dark:bg-slate-800">
          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
          {description && <p className="text-gray-600 dark:text-slate-300 text-sm">{description}</p>}
        </div>
      )}
    </div>
  );
}
