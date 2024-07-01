import Image from 'next/image';

type SearchOption = {
  iconSrc: string;
  label: string;
};

export default function SearchOptions() {
  const options: SearchOption[] = [
    { iconSrc: '/images/icon-globe.svg', label: '任地から探す' },
    { iconSrc: '/images/icon-map.svg', label: '現住所から探す' },
    { iconSrc: '/images/icon-people.svg', label: '隊次から探す' },
  ];

  return (
    <div className="flex justify-center space-x-4 p-4 mt-10">
      {options.map((option, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-gray-100 rounded-full p-4 mb-2">
            <Image src={option.iconSrc} alt={option.label} width={36} height={36} />
          </div>
          <span className="text-sm text-center">{option.label}</span>
        </div>
      ))}
    </div>
  );
}
