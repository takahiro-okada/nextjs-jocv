import fetchCohortUsers from '@/app/queries/fetchCohortUsers';
import { UserType } from '@/app/type';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import Image from 'next/image';

export default async function Page({ params }: { params: { year: string } }) {
  const data = await fetchCohortUsers(parseInt(params.year));
  const users = data.users;

  return (
    <>
      <Header />
      <div className="px-4">
        <div className="flex items-center text-2xl">
          <Image src="/images/icon-member.svg" alt="" width={40} height={40} />
          <h2 className="mb-4 text-xl">{params.year}年に参加したJOCV</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user: UserType) => (
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
      <Footer />
    </>
  );
}
