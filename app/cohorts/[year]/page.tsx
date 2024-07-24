import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';

export default function Page({ params }: { params: { year: string } }) {
  return (
    <>
      <Header />
      <div className="px-4">
        <div className="flex items-center text-2xl">
          <Image src="/images/icon-member.svg" alt="" width={40} height={40} />
          <h1 className="ml-2">{params.year}年に参加したJOCV</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
