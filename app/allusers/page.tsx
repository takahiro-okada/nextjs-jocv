import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import Image from 'next/image';
import { UserType } from '@/app/type';
import { users } from '@/constants/users';

// async function fetchAllUsers() {
//   console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
//   if (!process.env.NEXT_PUBLIC_API_URL) {
//     throw new Error('API URL is not defined in the environment variables');
//   }
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
//     cache: 'no-cache',
//   });
//   return res.json();
// }

export default async function Page() {
  // const users: UserType[] = await fetchAllUsers();

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
