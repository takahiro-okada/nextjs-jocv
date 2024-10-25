import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

type Prefecture = {
  id: string;
  name: string;
  slug: string;
  _count: {
    users: number;
  };
};

type Country = {
  id: string;
  name: string;
  slug: string;
  _count: {
    currentUsers: number;
  };
};

type CurrentAddressData = {
  japanUsers: number;
  overseasUsers: number;
  japanPrefectures: Prefecture[];
  countries: Country[];
};

async function fetchCurrentAddressData(): Promise<CurrentAddressData> {
  const res = await fetch(`${API_URL}/api/currentaddress`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch current address data');
  }
  return res.json();
}

export default async function CurrentAddress() {
  const { japanUsers, overseasUsers, japanPrefectures, countries } = await fetchCurrentAddressData();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SectionTitle title="現住所" />

        <div className="mt-8">
          <h3 className="mb-6 text-2xl font-bold">日本国内 ({japanUsers}名)</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {japanPrefectures.map((prefecture) => (
              <Link
                key={prefecture.id}
                href={`/currentaddress/japan/${prefecture.slug}`}
                className={`rounded-lg border p-4 ${
                  prefecture._count.users > 0 ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100'
                }`}
              >
                <span className="text-lg">{prefecture.name}</span>
                <span className="ml-2 text-sm font-semibold">({prefecture._count.users}名)</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold">海外 ({overseasUsers}名)</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {countries.map((country) => (
              <Link
                key={country.id}
                href={`/currentaddress/${country.slug}`}
                className="rounded-lg border bg-green-100 p-4 hover:bg-green-200"
              >
                <span className="text-lg">{country.name}</span>
                <span className="ml-2 text-sm font-semibold">({country._count.currentUsers}名)</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
