import SearchOptions from '@/components/SearchOptions';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Image from 'next/image';

export default function Profile() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-4 mt-10">
          <div className="flex justify-center">
            <Image
              src="/images/sample-person.jpg"
              alt="user profile"
              className="size-36 rounded-full object-cover"
              width={600}
              height={600}
            />
          </div>
          <div className="mt-3 text-center text-xl">Yamada Tarou</div>
          <div className="text-center">愛知県</div>
          <p className="mt-4">プロフィール情報が入ります</p>
          <div className="mt-8 flex justify-between">
            <div className="">
              <div className="">タンザニア</div>
              <div className="">26年1次隊</div>
            </div>
            <div className="">
              <a
                href=""
                className="inline-block min-w-32 rounded-3xl border border-[#E7E7E7] bg-[#F7FAFC] px-4 py-2 text-center"
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
