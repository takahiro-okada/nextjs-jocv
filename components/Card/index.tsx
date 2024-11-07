import Link from 'next/link';
import Image from 'next/image';

type CardProps = {
  title: string;
  count: string;
  href: string;
  subtitle?: string;
  flagsrc?: string;
  className?: string;
};

export default function Card({ title, count, href, subtitle, flagsrc, className = '' }: CardProps) {
  return (
    <li className={`overflow-hidden rounded-lg border ${className}`}>
      <Link href={href} className="block border-[#f1f6f9] bg-white p-4 transition-colors hover:bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold">{title}</h4>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            <span className="mt-1 inline-block rounded-full border-[#f1f6f9] bg-[#f1f6f9] px-2 py-1 text-sm">
              {count}人
            </span>
          </div>
          {flagsrc && <Image src={flagsrc} alt={`${title}の国旗`} width={40} height={40} className="rounded-sm" />}
        </div>
      </Link>
    </li>
  );
}
