import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { PREFECTURES } from '@/constants/prefectures';
import fetchUsersByCurrentPrefecture from '@/app/queries/fetchUsersByCurrentPrefecture';
import { UserType } from '@/app/type';
import ProfileCard from '@/components/ProfileCard';

export default async function PrefecturePage({ params }: { params: { prefecture: string } }) {
  const { prefecture } = params;
  const prefectureData = PREFECTURES.find((p) => p.slug === prefecture);
  const users: UserType[] = await fetchUsersByCurrentPrefecture(prefecture);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SectionTitle title={`${prefectureData?.name}在住者一覧`} />
        <div className="mt-8">
          {users && users.length > 0 ? (
            <>
              <h3 className="mb-6 text-2xl font-bold">在住者 ({users.length}名)</h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {users.map((user: UserType) => (
                  <ProfileCard key={user.id} user={user} />
                ))}
              </ul>
            </>
          ) : (
            <p className="py-8 text-center text-xl">まだ、この都道府県に登録しているユーザーはいません。</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
