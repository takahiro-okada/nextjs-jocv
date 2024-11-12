import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import { UserType } from '@/app/type';
import ProfileCard from '@/components/ProfileCard';
import fetchUsersByDeploymentCountry from '@/app/queries/fetchUsersByCurrenDeploymentCountry';

export default async function RegionPage({ params }: { params: { slug: string } }) {
  const countrySlug = params.slug;
  const users: UserType[] = await fetchUsersByDeploymentCountry(countrySlug);
  console.log(users);

  return (
    <>
      <Header />

      <main className="container mx-auto px-4">
        <SectionTitle title={`派遣国 - ${countrySlug}`} />

        <div className="mt-8">
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user: UserType) => (
              <ProfileCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
