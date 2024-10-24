import SearchOptions from '@/components/SearchOptions';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fetchUser from '@/app/queries/fetchUser';

export default async function Profile({ params }: { params: { profile: number } }) {
  const userId = params.profile;
  const user = await fetchUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <div className="mx-4 mt-10">
          <div className="flex justify-center">
            <Image
              src={user.image || '/default-profile.png'}
              alt="user profile"
              className="size-36 rounded-full object-cover"
              width={600}
              height={600}
            />
          </div>
          <div className="mt-3 text-center text-xl">{user.name}</div>
          <p className="mt-4">{user.bio}</p>
          <div className="mt-8 flex justify-between">
            <div className="">
              <div className="">
                現住所：{user.currentCountry?.name ?? '登録がありません'} {user.currentPrefecture?.name}
              </div>
              <div className="">派遣国：{user.deploymentCountry?.name ?? '登録がありません'}</div>
              <div className="">
                派遣隊次：{user.cohort?.cohortYear}年{user.cohort?.cohortTerm}期
              </div>
            </div>
            <div className="">
              <a
                href=""
                className="inline-block min-w-32 rounded-3xl border border-[#E7E7E7] bg-[#F7FAFC] px-4 py-2 text-center"
              >
                Follow
              </a>
            </div>
          </div>
        </div>

        <SearchOptions />
      </main>

      <Footer />
    </>
  );
}
