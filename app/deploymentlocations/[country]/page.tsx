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

      <main className="mx-4 mt-8">
        <SectionTitle title={`派遣国 - ${country.name}`} />

        <div className="mt-8">
          <h2 className="text-xl">ユーザー一覧</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <ProfileCard
                key={user.id}
                name={user.name}
                deploymentCountry={user.deploymentCountry}
                image={user.image}
                id={user.id}
                currentCountry={user.currentCountry}
                currentPrefecture={user.currentPrefecture}
                bio={user.bio}
                favoritedBy={[]}
                favorites={[]}
                accounts={[]}
                sessions={[]}
                createdAt={new Date()}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
