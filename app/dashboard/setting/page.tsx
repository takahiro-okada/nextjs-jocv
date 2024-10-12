'use client';
import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Settings() {
  // const { profile, isLoading, error, updateProfile } = useProfile();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // if (!profile) return <div>No profile data available</div>;

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     await updateProfile(profile);
  //     alert('Profile updated successfully');
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     alert('Failed to update profile');
  //   }
  // };

  return (
    <>
      <Header />
      <main>
        <div className="mx-4 mt-10">
          <h1 className="text-2xl">設定</h1>
          <hr className="my-3" />
          {/* <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <p>プロフィール画像</p>
              <div className="flex items-center">
                <input
                  id="select-avatar"
                  type="file"
                  accept="image/*"
                  className="absolute h-1 w-0 opacity-0"
                  aria-label="Select profile image"
                />
                <button className="inline-flex w-1/5" aria-labelledby="select-avatar">
                  <Image
                    src={profile.image || '/images/default-avatar.jpg'}
                    alt="Profile image"
                    width={150}
                    height={150}
                    className="size-16 rounded-full"
                  />
                </button>
                <div className="ml-2 mt-4 w-4/5 rounded-xl border border-gray-300 p-4">
                  <label htmlFor="select-avatar" className="rounded-xl border border-gray-300 bg-[#F7FAFC] px-4 py-2">
                    <span>画像を変更</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="name">表示名</label>
              <input
                type="text"
                id="name"
                value={profile.name || ''}
                onChange={(e) => updateProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                aria-required="true"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="bio">自己紹介</label>
              <textarea
                id="bio"
                value={profile.bio || ''}
                onChange={(e) => updateProfile({ ...profile, bio: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                rows={5}
                aria-required="true"
              ></textarea>
            </div>

            {/* Cohort Select Option */}
          {/* <div className="mt-6">
              <label htmlFor="cohort">コホート</label>
              <select
                id="cohort"
                value={profile.cohortId || ''}
                onChange={(e) => updateProfile({ ...profile, cohortId: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                aria-required="true"
              >
                <option value="">未選択</option>
                {cohorts.map((cohort: CohortType) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </option>
                ))}
              </select>
            </div> */}

          {/* Twitter */}
          {/* <div className="mt-6">
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                id="twitter"
                value={profile.twitterUrl || ''}
                onChange={(e) => updateProfile({ ...profile, twitterUrl: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                aria-required="false"
              />
            </div> */}

          {/* Instagram */}
          {/* <div className="mt-6">
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                id="instagram"
                value={profile.instagramUrl || ''}
                onChange={(e) => updateProfile({ ...profile, instagramUrl: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                aria-required="false"
              />
            </div> */}

          {/* Website */}
          {/* <div className="mt-6">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                value={profile.websiteUrl || ''}
                onChange={(e) => updateProfile({ ...profile, websiteUrl: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                aria-required="false"
              />
            </div> */}

          {/* Save Button */}
          {/* <div className="mt-6">
              <button type="submit" className="rounded-full border px-4 py-2">
                更新する
              </button>
            </div>
          </form>  */}
        </div>
      </main>
      <Footer />
    </>
  );
}
