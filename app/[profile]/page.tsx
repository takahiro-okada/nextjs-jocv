import SearchOptions from '@/components/SearchOptions';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Image from 'next/image';

interface SearchOption {
  iconSrc: string;
  label: string;
}

export default function Profile() {
  const options: SearchOption[] = [
    { iconSrc: '/images/icon-globe.svg', label: '任地から探す' },
    { iconSrc: '/images/icon-map.svg', label: '現住所から探す' },
    { iconSrc: '/images/icon-people.svg', label: '隊次から探す' },
  ];

  return (
    <>
      <Header />
      <main>
        <div className="mx-4 mt-10">
          <div className="flex justify-center">
            <Image
              src="/images/sample-person.jpg"
              alt="user profile"
              className="rounded-full w-36 h-36 object-cover"
              width={600}
              height={600}
            />
          </div>
          <div className="text-xl mt-3 text-center">Yamada Tarou</div>
          <div className="text-center">愛知県</div>
          <p className="mt-4">プロフィール情報が入ります</p>
          <div className="flex justify-between mt-8">
            <div className="">
              <div className="">タンザニア</div>
              <div className="">26年1次隊</div>
            </div>
            <div className="">
              <a
                href=""
                className="bg-[#F7FAFC] border border-[#E7E7E7] text-center inline-block rounded-3xl px-4 py-2 min-w-32"
              >
                Follow
              </a>
            </div>
          </div>
        </div>

        <SearchOptions />
      </main>

      <Footer />
    </>
  );
}
