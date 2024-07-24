import Header from '@/components/Header';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { cohorts } from '@/constants/cohorts';

export default function Page() {
  return (
    <>
      <Header />

      <main className="mx-4 mt-8">
        <SectionTitle title="派遣時期" />

        <div className="mt-8">
          <ul className="grid grid-cols-2 gap-8">
            {cohorts.map((cohort) => (
              <li key={cohort.id}>
                <Link href={`/cohorts/${cohort.year}`} className="hover:text-blue-600">
                  {cohort.year}年({cohort.era}
                  {cohort.eraYear ? `${cohort.eraYear}年度` : ''})
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
