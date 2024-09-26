import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import { UserType } from '@/app/type';
import ProfileCard from '@/components/ProfileCard';
import fetchAllUsers from '@/app/queries/fetchAllUsers';

export default async function Page() {
  const users: UserType[] = await fetchAllUsers();

  try {
    return (
      <>
        <Header />
        <div className="px-4">
          <div className="flex items-center text-2xl">
            <Image src="/images/icon-member.svg" alt="" width={40} height={40} />
          </div>

          <div className="mt-10">
            {users.map((user: UserType, index: number) => (
              <ProfileCard key={index} {...user} />
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    return <div>Error loading users. Please try again later.</div>;
  }
}
