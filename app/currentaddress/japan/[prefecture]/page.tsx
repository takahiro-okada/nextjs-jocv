import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { UserType } from '@/app/type';
import ProfileCard from '@/components/ProfileCard';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchPrefectureData(prefecture: string) {
  const res = await fetch(`${API_URL}/api/currentaddress/japan/${prefecture}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch prefecture data');
  }
  return res.json();
}

export default async function PrefecturePage({ params }: { params: { prefecture: string } }) {
  const { prefecture } = params;
  const prefectureData = await fetchPrefectureData(prefecture);

  if (!prefectureData) {
    return notFound();
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SectionTitle title={`${prefectureData.name}在住者一覧`} />
        <div className="mt-8">
          <h3 className="mb-6 text-2xl font-bold">在住者 ({prefectureData.users.length}名)</h3>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {prefectureData.users.map((user: UserType, index: number) => (
              <ProfileCard key={index} user={user} />
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
