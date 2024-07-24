import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import Image from 'next/image';
import { UserType } from '@/app/type';

async function fetchAllUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    cache: 'no-cache',
  });

  return res.json();
}

export default async function Page() {
  const users: UserType[] = await fetchAllUsers();

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
}
