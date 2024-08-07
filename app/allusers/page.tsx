import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import { UserType } from '@/app/type';
import ProfileCard from '@/components/ProfileCard';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchAllUsers() {
  console.log(`Fetching users from: ${API_URL}/api/users`);
  const res = await fetch(`${API_URL}/api/users`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default async function Page() {
  try {
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
  } catch (error) {
    console.error('Error fetching users:', error);
    return <div>Error loading users. Please try again later.</div>;
  }
}
