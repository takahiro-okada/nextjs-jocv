import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import { regions, countries } from '@/constants/countries';
import { users } from '@/constants/users';

export default function DispatchedCountry() {
  return (
    <>
      <Header />

      <main className="mt-8 mx-4">
        <SectionTitle title="派遣国" />

        <div className="mt-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map((region) => {
              const regionCountries = countries.filter((country) => country.regionId === region.id);
              const regionUserCount = users.filter((user) =>
                regionCountries.some((country) => country.id === user.countryId),
              ).length;

              return (
                <Link href={`/dispatchedcountry/${region.slug}`} className="text-lg font-bold">
                  <li key={region.id} className="border p-4 rounded-lg">
                    {region.name}
                    <p className="mt-2">国数: {regionCountries.length}</p>
                    <p>ユーザー数: {regionUserCount}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}
