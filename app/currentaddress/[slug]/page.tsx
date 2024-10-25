import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import ProfileCard from '@/components/ProfileCard';
import { UserType } from '@/app/type';

type LocationData = {
  name: string;
  users: UserType[];
};

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchLocationData(slug: string): Promise<LocationData | null> {
  const res = await fetch(`${API_URL}/api/currentaddress/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch location data');
  }
  return res.json();
}

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const locationData = await fetchLocationData(slug);

  if (!locationData) {
    return notFound();
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SectionTitle title={`${locationData.name}在住者一覧`} />
        <div className="mt-8">
          <h3 className="mb-6 text-2xl font-bold">在住者 ({locationData.users.length}名)</h3>
          {locationData.users.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {locationData.users.map((user) => (
                <ProfileCard key={user.id} user={user} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">この地域に在住しているユーザーはいません。</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
