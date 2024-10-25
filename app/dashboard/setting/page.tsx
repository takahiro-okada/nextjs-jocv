'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useProfile } from '@/hooks/useProfile';
import fetchAllCountry from '@/app/queries/fetchAllCountry';
import { UserType } from '@/app/type';
import fetchPrefectures from '@/app/queries/fetchPrefectures';
import fetchAllCohorts from '@/app/queries/fetchAllCohorts';

interface CohortTerm {
  id: string;
  term: string;
  name: string;
  userCount: number;
}

interface GroupedCohorts {
  year: string;
  terms: CohortTerm[];
  totalUsers: number;
}

export default function Settings() {
  const { profile: initialProfile, isLoading, error, updateProfile } = useProfile();
  const [profile, setProfile] = useState<UserType | null>(null);
  const [countries, setCountries] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [prefectures, setPrefectures] = useState<Array<{ id: string; name: string }>>([]);
  const [cohorts, setCohorts] = useState<GroupedCohorts[]>([]);

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedCountries, fetchedPrefectures, fetchedCohorts] = await Promise.all([
          fetchAllCountry(),
          fetchPrefectures(),
          fetchAllCohorts(),
        ]);
        setCountries(fetchedCountries);
        setPrefectures(fetchedPrefectures);
        setCohorts(fetchedCohorts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    loadData();
  }, []);

  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">Error: {error}</div>;
  if (!profile) return <div className="flex h-screen items-center justify-center">No profile data available</div>;

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
        deploymentCountryId: profile.deploymentCountryId,
        cohortId: profile.cohortId,
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
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-2xl font-bold">設定</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div>
              <label htmlFor="select-avatar" className="mb-2 block text-sm font-medium text-gray-700">
                プロフィール画像
              </label>
              <div className="flex items-center space-x-4">
                <Image
                  src={profile.image || '/images/default-avatar.jpg'}
                  alt="Profile image"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <label
                  htmlFor="select-avatar"
                  className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  画像を変更
                  <input
                    id="select-avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    aria-label="Select profile image"
                  />
                </label>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                表示名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="mb-2 block text-sm font-medium text-gray-700">
                自己紹介
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio || ''}
                onChange={handleInputChange}
                rows={5}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              ></textarea>
            </div>

            {/* Current Address */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">現住所</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentCountryId" className="mb-2 block text-sm font-medium text-gray-700">
                    国
                  </label>
                  <select
                    id="currentCountryId"
                    name="currentCountryId"
                    value={profile.currentCountryId || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {profile.currentCountryId === japanId && (
                  <div>
                    <label htmlFor="currentPrefectureId" className="mb-2 block text-sm font-medium text-gray-700">
                      都道府県
                    </label>
                    <select
                      id="currentPrefectureId"
                      name="currentPrefectureId"
                      value={profile.currentPrefectureId || ''}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>

            {/* Deployment Country */}
            <div>
              <label htmlFor="deploymentCountryId" className="mb-2 block text-sm font-medium text-gray-700">
                派遣国
              </label>
              <select
                id="deploymentCountryId"
                name="deploymentCountryId"
                value={profile.deploymentCountryId || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              >
                <option value="">派遣国を選択してください</option>
                {countries
                  .filter((country) => country.slug !== 'japan')
                  .map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Cohort */}
            <div>
              <label htmlFor="cohortId" className="mb-2 block text-sm font-medium text-gray-700">
                隊次
              </label>
              <select
                id="cohortId"
                name="cohortId"
                value={profile.cohortId || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              >
                <option value="">隊次を選択してください</option>
                {cohorts.map((yearGroup) => (
                  <optgroup key={yearGroup.year} label={yearGroup.year}>
                    {yearGroup.terms.map((cohort) => (
                      <option key={cohort.id} value={cohort.id}>
                        {cohort.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Social Media Links */}
            <div>
              <label htmlFor="twitter" className="mb-2 block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <input
                type="text"
                id="twitter"
                name="twitterUrl"
                value={profile.twitterUrl || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="false"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="mb-2 block text-sm font-medium text-gray-700">
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                name="instagramUrl"
                value={profile.instagramUrl || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="false"
              />
            </div>
            <div>
              <label htmlFor="website" className="mb-2 block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                id="website"
                name="websiteUrl"
                value={profile.websiteUrl || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="false"
              />
            </div>

            {/* Save Button */}
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
              >
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
