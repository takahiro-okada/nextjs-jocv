import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { COHORTS } from '@/constants/cohorts';
import Link from 'next/link';

export default async function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SectionTitle title="派遣時期" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COHORTS.map((cohort) => (
            <div
              key={cohort.id}
              className="rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="p-4">
                <Link href={`/cohorts/${cohort.id}`} passHref className="mb-2 block">
                  <h3 className="text-xl font-semibold transition-colors duration-200">{cohort.japaneseEra}派遣隊次</h3>
                </Link>
                <p className="mb-2 text-gray-600">人数: {/* API-fetched count will go here */}</p>
                <div className="flex flex-wrap gap-2">
                  {cohort.groups.map((group) => (
                    <Link
                      className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-300"
                      key={group.id}
                      href={`/cohorts/${cohort.id}/${group.id}`}
                      passHref
                    >
                      {group.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
