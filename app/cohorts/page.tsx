import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import fetchAllCohorts from '@/app/queries/fetchAllCohorts';
import Link from 'next/link';

export default async function Page() {
  const cohortsData: { [key: string]: { year: string; totalUsers: number } } = await fetchAllCohorts();
  const cohorts = Object.values(cohortsData).sort((a, b) => {
    if (a.year === '1990以前') return -1;
    if (b.year === '1990以前') return 1;
    return parseInt(a.year) - parseInt(b.year);
  });

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <SectionTitle title="派遣時期" />

        <div className="mt-8">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cohorts.map((cohort) => (
              <li key={cohort.year} className="overflow-hidden rounded-lg border">
                <Link
                  href={`/cohorts/${cohort.year}`}
                  className="block bg-white p-4 transition-colors hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {cohort.year === '1990以前' ? cohort.year : `${cohort.year}年`}
                    </span>
                    <span className="rounded-full bg-blue-500 px-2 py-1 text-sm text-white">{cohort.totalUsers}人</span>
                  </div>
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
