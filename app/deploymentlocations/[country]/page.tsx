import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import { UserType } from '@/app/type';
import ProfileCard from '@/components/ProfileCard';
import fetchRegionUsers from '@/app/queries/fetchRegionUsers';

export default async function RegionPage({ params }: { params: { country: string } }) {
  const region = { slug: params.country };
  const users: UserType[] = await fetchRegionUsers(region.slug);

  return (
    <>
      <Header />

      <main className="mx-4 mt-8">
        <SectionTitle title={`派遣国 - ${region.slug}`} />

        <div className="mt-8">
          <h2 className="mb-4 text-xl">ユーザー一覧</h2>
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
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
