'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';
import { JAPAN_REGIONS } from '@/constants/prefectures';

export default function CurrentCountry() {
  return (
    <>
      <Header />

      <main className="mx-4 mt-8">
        <SectionTitle title="現住所" />

        <div className="mt-8">
          <div className="">
            <h3 className="text-2xl">日本国内</h3>
            {JAPAN_REGIONS.map((region) => (
              <div key={region.name} className="mt-10">
                <h4 className="text-xl">{region.name}</h4>
                <ul className="mt-4 grid grid-cols-2 gap-4">
                  {region.prefectures.map((prefecture) => (
                    <li key={prefecture.name}>
                      <Link href={`currentaddress/${prefecture.romaji}`}>{prefecture.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
