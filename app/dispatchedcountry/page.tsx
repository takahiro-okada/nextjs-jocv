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

      <main className="mx-4 mt-8">
        <SectionTitle title="派遣国" />

        <div className="mt-8">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => {
              const regionCountries = countries.filter((country) => country.regionId === region.id);
              const regionUserCount = users.filter((user) =>
                regionCountries.some((country) => country.id === user.countryId),
              ).length;

              return (
                <Link key={region.id} href={`/dispatchedcountry/${region.slug}`} className="text-lg font-bold">
                  <li className="rounded-lg border p-4">
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
