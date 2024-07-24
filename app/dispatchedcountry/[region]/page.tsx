import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import { regions } from '@/constants/countries';

export default function RegionPage({ params }: { params: { region: string } }) {
  const region = regions.find((r) => r.slug === params.region);
  // const regionCountries = countries.filter((country) => country.regionId === region?.id);

  // const regionUsers = users.filter((user) => regionCountries.some((country) => country.id === user.countryId));

  return (
    <>
      <Header />

      <main className="mx-4 mt-8">
        <SectionTitle title={`派遣国 - ${region?.name}`} />

        <div className="mt-8">
          <h2 className="mb-4 text-xl">ユーザー一覧</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* {regionUsers.map((user) => (
              <ProfileCard
                key={user.id}
                name={user.name}
                location={`${countries.find((c) => c.id === user.countryId)?.name} ${user.prefecture}`}
                image={user.image}
              />
            ))} */}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
