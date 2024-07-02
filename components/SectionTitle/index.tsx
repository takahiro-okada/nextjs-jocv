import Image from 'next/image';

export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="text-2xl flex items-center">
      <Image src="/images/icon-search.svg" alt="" width={40} height={40} />
      <h1 className="ml-2">{title}から調べる</h1>
    </div>
  );
}
