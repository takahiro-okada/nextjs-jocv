import Image from 'next/image';
import Link from 'next/link';

type SearchOption = {
  iconSrc: string;
  label: string;
  slug: string;
};

export default function SearchOptions() {
  const options: SearchOption[] = [
    { iconSrc: '/images/icon-globe.svg', label: '任地から探す', slug: '/deploymentlocations' },
    { iconSrc: '/images/icon-map.svg', label: '現住所から探す', slug: '/currentaddress' },
    { iconSrc: '/images/icon-people.svg', label: '隊次から探す', slug: '/cohorts' },
  ];

  return (
    <div className="mt-10 flex justify-center space-x-4 p-4">
      {options.map((option, index) => (
        <div key={index} className="flex flex-col items-center">
          <Link href={option.slug} className="mb-2 rounded-full bg-gray-100 p-4">
            <Image src={option.iconSrc} alt={option.label} width={36} height={36} />
          </Link>
          <span className="text-center text-sm">{option.label}</span>
        </div>
      ))}
    </div>
  );
}
