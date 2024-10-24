import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import { UserType } from '@/app/type';
import ProfileCard from '@/components/ProfileCard';
import fetchRegionUsers from '@/app/queries/fetchRegionUsers';
import fetchCountry from '@/app/queries/fetchContry';

export default async function RegionPage({ params }: { params: { country: string } }) {
  const countrySlug = params.country;
  const country = await fetchCountry(countrySlug);
  const users: UserType[] = await fetchRegionUsers(countrySlug);

  return (
    <>
      <Header />

      <main className="container mx-auto px-4">
        <SectionTitle title={`派遣国 - ${country.name}`} />

        <div className="mt-8">
          <h2 className="mb-6 text-2xl font-bold">ユーザー一覧</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <ProfileCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
