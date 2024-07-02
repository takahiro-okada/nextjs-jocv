import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import SectionTitle from '@/components/SectionTitle';
import { regions, countries } from '@/constants/countries';
import { users } from '@/constants/users';

export default function RegionPage({ params }: { params: { region: string } }) {
  const region = regions.find((r) => r.slug === params.region);
  const regionCountries = countries.filter((country) => country.regionId === region?.id);

  const regionUsers = users.filter((user) => regionCountries.some((country) => country.id === user.countryId));

  return (
    <>
      <Header />

      <main className="mt-8 mx-4">
        <SectionTitle title={`派遣国 - ${region?.name}`} />

        <div className="mt-8">
          <h2 className="text-xl mb-4">ユーザー一覧</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionUsers.map((user) => (
              <ProfileCard
                key={user.id}
                name={user.name}
                location={`${countries.find((c) => c.id === user.countryId)?.name} ${user.prefecture}`}
                image={user.image}
                description={user.description}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
