import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import Image from 'next/image';

export default function Page({ params }: { params: { year: string } }) {
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
        <div className="text-2xl flex items-center">
          <Image src="/images/icon-member.svg" alt="" width={40} height={40} />
          <h1 className="ml-2">{params.year}年に参加したJOCV</h1>
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
