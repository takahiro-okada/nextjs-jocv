import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import Image from 'next/image';
import { JAPAN_REGIONS } from '@/constants/prefectures';

export default function Page({ params }: { params: { currentaddress: string } }) {
  // ローマ字から日本語表記に変換する関数
  const getPrefectureName = (romaji: string): string => {
    for (const region of JAPAN_REGIONS) {
      const prefecture = region.prefectures.find((p) => p.romaji === romaji);
      if (prefecture) {
        return prefecture.name;
      }
    }
    return romaji;
  };

  // URLから取得したローマ字表記を日本語表記に変換
  const prefectureName = getPrefectureName(params.currentaddress);

  const profiles = [
    {
      name: '山田 花子',
      location: 'タンザニア 愛知県',
      image: '/images/sample-person.jpg',
      description: 'Hello World',
    },
    {
      name: '山田 花子',
      location: 'タンザニア 愛知県',
      image: '/images/sample-person.jpg',
      description: 'Hello World',
    },
    {
      name: '山田 花子',
      location: 'タンザニア 愛知県',
      image: '/images/sample-person.jpg',
      description: 'Hello World',
    },
  ];

  return (
    <>
      <Header />
      <div className="px-4">
        <div className="flex items-center text-2xl">
          <Image src="/images/icon-member.svg" alt="" width={40} height={40} />
          <h1 className="ml-2">{prefectureName}在住のJOCV</h1>
        </div>

        <div className="mt-10">
          {profiles.map((profile, index) => (
            <ProfileCard key={index} {...profile} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
