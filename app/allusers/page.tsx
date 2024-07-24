import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';

// async function fetchAllUsers() {
//   console.log('API URL:', 'https://nextjs-jocv-g9i70urcy-takahirookadas-projects.vercel.app/'); // 環境変数のログ出力
//   const res = await fetch(`https://nextjs-jocv-g9i70urcy-takahirookadas-projects.vercel.app/api/users`, {
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

        {/* <div className="mt-10">
          {users.map((user: UserType, index: number) => (
            <ProfileCard key={index} {...user} />
          ))}
        </div> */}
      </div>
      <Footer />
    </>
  );
}
