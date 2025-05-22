import SearchOptions from '@/components/SearchOptions';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fetchUser from '@/app/queries/fetchUser';
import { Instagram, Globe, X } from 'lucide-react';

export default async function Profile({ params }: { params: { profile: number } }) {
  const userId = params.profile;
  const user = await fetchUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <div className="flex flex-col items-center">
          <Image
            src={user.image || '/images/default-avatar.png'}
            alt="user profile"
            className="size-40 rounded-full border-2 border-[#f1f6f9] object-cover p-5"
            width={600}
            height={600}
          />
          <h1 className="mt-6 text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="mt-4 max-w-2xl text-center text-lg text-gray-600">{user.bio}</p>
        </div>

        <div className="mt-12 rounded-lg bg-white p-6 shadow-md">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-gray-600">
                <span className="font-semibold">現住所：</span>
                {user.currentCountry?.name ?? '登録がありません'} {user.currentPrefecture?.name}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">派遣国：</span>
                {user.deploymentCountry?.name ?? '登録がありません'}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">派遣隊次：</span>
                {user.cohort?.cohortTerm}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              {user.twitterUrl && (
                <a
                  href={user.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-800"
                >
                  <X className="mr-2 size-5" />X
                </a>
              )}
              {user.instagramUrl && (
                <a
                  href={user.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-md bg-pink-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-pink-600"
                >
                  <Instagram className="mr-2 size-5" />
                  Instagram
                </a>
              )}
              {user.websiteUrl && (
                <a
                  href={user.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-md bg-gray-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-600"
                >
                  <Globe className="mr-2 size-5" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <SearchOptions />
        </div>
      </main>

      <Footer />
    </>
  );
}
