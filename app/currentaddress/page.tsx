import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';
import { JAPAN_REGIONS } from '@/constants/prefectures';
import fetchAllCurrentCountry from '../queries/fetchAllCurrentCountry';

type User = {
  id: string;
  name: string;
  currentCountry: {
    name: string;
    slug: string;
    isDeveloping: boolean;
    continent: string;
  };
  currentPrefecture: {
    name: string;
    slug: string;
  } | null;
};

export default async function CurrentCountry() {
  const users: User[] = await fetchAllCurrentCountry();

  const japanUsers = users.filter((user) => user.currentCountry.slug === 'japan');
  const overseasUsers = users.filter((user) => user.currentCountry.slug !== 'japan');

  const prefectureCounts = JAPAN_REGIONS.map((region) => ({
    ...region,
    prefectures: region.prefectures.map((prefecture) => ({
      ...prefecture,
      count: japanUsers.filter((user) => user.currentPrefecture?.slug === prefecture.romaji).length,
    })),
  }));

  const overseasCountries = overseasUsers.reduce(
    (acc, user) => {
      const country = user.currentCountry;
      if (!acc[country.slug]) {
        acc[country.slug] = { ...country, count: 0 };
      }
      acc[country.slug].count++;
      return acc;
    },
    {} as Record<string, { name: string; slug: string; isDeveloping: boolean; continent: string; count: number }>,
  );

  return (
    <>
      <Header />

      <main className="container mx-auto px-4">
        <SectionTitle title="現住所" />

        <div className="mt-8">
          <h3 className="mb-6 text-2xl font-bold">日本国内</h3>
          {prefectureCounts.map((region) => (
            <div key={region.name} className="mb-8">
              <h4 className="mb-4 text-xl font-semibold">{region.name}</h4>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {region.prefectures.map((prefecture) => (
                  <li
                    key={prefecture.romaji}
                    className={`rounded-lg border p-4 transition-colors ${
                      prefecture.count > 0 ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100'
                    }`}
                  >
                    {prefecture.count > 0 ? (
                      <Link href={`currentaddress/${prefecture.romaji}`} className="flex items-center justify-between">
                        <span className="text-lg">{prefecture.name}</span>
                        <span className="rounded-full bg-blue-500 px-2 py-1 text-sm text-white">
                          {prefecture.count}人
                        </span>
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-500">{prefecture.name}</span>
                        <span className="rounded-full bg-gray-300 px-2 py-1 text-sm text-gray-600">0人</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold">海外</h3>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.values(overseasCountries).map((country) => (
              <li
                key={country.slug}
                className="rounded-lg border bg-green-100 p-4 transition-colors hover:bg-green-200"
              >
                <Link href={`currentaddress/${country.slug}`} className="flex items-center justify-between">
                  <span className="text-lg">{country.name}</span>
                  <span className="rounded-full bg-green-500 px-2 py-1 text-sm text-white">{country.count}人</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}
