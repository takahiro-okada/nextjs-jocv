import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { COUNTRIES } from '@/constants/countries';
import { UserType } from '@/app/type';
import ProfileCard from '@/components/ProfileCard';
import fetchUsersByCurrentCountry from '@/app/queries/fetchUsersByCurrentCountry';

export default async function CountryPage(props: { params: Promise<{ country: string }> }) {
  const params = await props.params;
  const { country } = params;
  const prefectureData = COUNTRIES.find((p) => p.slug === country);
  const users: UserType[] = await fetchUsersByCurrentCountry(country);

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
            <p className="py-8 text-center text-xl">まだ、ユーザーはいません。</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
