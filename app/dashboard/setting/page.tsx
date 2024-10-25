'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useProfile } from '@/hooks/useProfile';
import fetchAllCountry from '@/app/queries/fetchAllCountry';
import { UserType } from '@/app/type';
import fetchPrefectures from '@/app/queries/fetchPrefectures';

export default function Settings() {
  const { profile: initialProfile, isLoading, error, updateProfile } = useProfile();
  const [profile, setProfile] = useState<UserType | null>(null);
  const [countries, setCountries] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [prefectures, setPrefectures] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);

  useEffect(() => {
    async function loadCountriesAndPrefectures() {
      try {
        const [fetchedCountries, fetchedPrefectures] = await Promise.all([fetchAllCountry(), fetchPrefectures()]);
        setCountries(fetchedCountries);
        setPrefectures(fetchedPrefectures);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    loadCountriesAndPrefectures();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data available</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile({
        ...profile,
        currentCountryId: profile.currentCountryId,
        currentPrefectureId: profile.currentPrefectureId,
      });
      setProfile(updatedProfile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const japanId = countries.find((country) => country.slug === 'japan')?.id;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        <div>
          <h1 className="text-2xl">設定</h1>
          <hr className="my-3" />
          <form onSubmit={handleSubmit}>
            {/* Profile Image */}
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
            {/* Display Name */}
            <div className="mt-6">
              <label htmlFor="name">表示名</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name || ''}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                aria-required="true"
              />
            </div>
            {/* Bio */}
            <div className="mt-6">
              <label htmlFor="bio">自己紹介</label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio || ''}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                rows={5}
                aria-required="true"
              ></textarea>
            </div>
            {/* Current Address */}
            <div className="mt-6">
              <h2 className="mb-2 text-xl">現住所</h2>

              {/* Country */}
              <div className="mb-4">
                <label htmlFor="currentCountryId">国</label>
                <select
                  id="currentCountryId"
                  name="currentCountryId"
                  value={profile.currentCountryId || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2"
                  aria-required="true"
                >
                  <option value="">国を選択してください</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prefecture (if country is Japan) */}
              {profile.currentCountryId === japanId && (
                <div className="mb-4">
                  <label htmlFor="currentPrefectureId">都道府県</label>
                  <select
                    id="currentPrefectureId"
                    name="currentPrefectureId"
                    value={profile.currentPrefectureId || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2"
                    aria-required="true"
                  >
                    <option value="">都道府県を選択してください</option>
                    {prefectures.map((prefecture) => (
                      <option key={prefecture.id} value={prefecture.id}>
                        {prefecture.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Twitter */}
            <div className="mt-6">
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                id="twitter"
                name="twitterUrl"
                value={profile.twitterUrl || ''}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                aria-required="false"
              />
            </div>
            {/* Instagram */}
            <div className="mt-6">
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                id="instagram"
                name="instagramUrl"
                value={profile.instagramUrl || ''}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                aria-required="false"
              />
            </div>
            {/* Website */}
            <div className="mt-6">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="websiteUrl"
                value={profile.websiteUrl || ''}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
                aria-required="false"
              />
            </div>
            {/* Save Button */}
            <div className="mb-10 mt-6">
              <button type="submit" className="rounded-full border px-4 py-2">
                更新する
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
