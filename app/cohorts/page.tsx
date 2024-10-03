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

      <main className="mx-4 mt-8">
        <SectionTitle title="派遣時期" />

        <div className="mt-8">
          <ul className="grid grid-cols-2 gap-8">
            {cohorts.map((cohort) => (
              <li key={cohort.year}>
                <Link href={`/cohorts/${cohort.year}`} className="hover:text-blue-600">
                  {cohort.year === '1990以前' ? cohort.year : `${cohort.year}年`} - ({cohort.totalUsers}人)
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
