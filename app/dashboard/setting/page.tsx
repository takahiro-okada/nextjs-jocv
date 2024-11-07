'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useProfile } from '@/hooks/useProfile';
import { UserType } from '@/app/type';
import { toast } from 'react-toastify';
import { PREFECTURES, AREAS } from '@/constants/prefectures';
import { COUNTRIES } from '@/constants/countries';
import { COHORTS } from '@/constants/cohorts';

export default function Settings() {
  const { profile: initialProfile, isLoading, error, updateProfile } = useProfile();
  const [profile, setProfile] = useState<UserType | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const japanId = useMemo(() => COUNTRIES.find((country) => country.slug === 'japan')?.id, []);
  const tokyoId = useMemo(() => PREFECTURES.find((prefecture) => prefecture.slug === 'tokyo')?.id, []);

  useEffect(() => {
    if (initialProfile) {
      setProfile({
        ...initialProfile,
        currentCountryId: initialProfile.currentCountryId || japanId,
        currentPrefectureId: initialProfile.currentPrefectureId || tokyoId?.toString(),
      });
    } else {
      setProfile({
        currentCountryId: japanId,
        currentPrefectureId: tokyoId,
      } as UserType);
    }
  }, [initialProfile, japanId, tokyoId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      const formData = new FormData();
      Object.entries(profile || {}).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const updatedProfile = await updateProfile(formData);
      toast.success('プロフィールが更新されました');
      setProfile(updatedProfile);
      setPreviewImage(null);
      setImageFile(null);
    } catch (error) {
      console.error('プロフィールの更新中にエラーが発生しました:', error);
      toast.error('プロフィールの更新に失敗しました');
    }
  };

  const groupedPrefectures = useMemo(() => {
    return AREAS.JAPAN.map((area) => ({
      ...area,
      prefectures: PREFECTURES.filter((prefecture) => prefecture.areaId === area.id),
    }));
  }, []);

  const groupedCountries = useMemo(() => {
    return AREAS.WORLD.map((area) => ({
      ...area,
      countries: COUNTRIES.filter((country) => country.continent === area.id),
    }));
  }, []);

  const groupedDeploymentCountries = useMemo(() => {
    return AREAS.WORLD.map((area) => ({
      ...area,
      countries: COUNTRIES.filter((country) => country.continent === area.id && country.isDeveloping),
    }));
  }, []);

  if (isLoading) return <div className="flex h-screen items-center justify-center">読み込み中...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">エラー: {error}</div>;
  if (!profile) return <div className="flex h-screen items-center justify-center">プロフィールデータがありません</div>;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-2xl font-bold">プロフィール設定</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="select-avatar" className="mb-2 block text-sm font-medium text-gray-700">
                プロフィール画像
              </label>
              <div className="flex items-center space-x-4">
                <Image
                  src={previewImage || profile.image || '/images/default-avatar.jpg'}
                  alt="プロフィール画像"
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
                    onChange={handleImageChange}
                    aria-label="プロフィール画像を選択"
                  />
                </label>
              </div>
            </div>

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
                required
              />
            </div>

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
              ></textarea>
            </div>

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
                    required
                  >
                    <option value="">国を選択してください</option>
                    {groupedCountries.map((area) => (
                      <optgroup key={area.id} label={area.name}>
                        {area.countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </optgroup>
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
                      required
                    >
                      <option value="">都道府県を選択してください</option>
                      {groupedPrefectures.map((area) => (
                        <optgroup key={area.id} label={area.name}>
                          {area.prefectures.map((prefecture) => (
                            <option key={prefecture.id} value={prefecture.id}>
                              {prefecture.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

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
                required
              >
                <option value="">派遣国を選択してください</option>
                {groupedDeploymentCountries.map((area) => (
                  <optgroup key={area.id} label={area.name}>
                    {area.countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cohortYear" className="mb-2 block text-sm font-medium text-gray-700">
                派遣年度
              </label>
              <select
                id="cohortYear"
                name="cohortYear"
                value={profile.cohortYear || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">派遣年度を選択してください</option>
                {COHORTS.map((cohort) => (
                  <option key={cohort.id} value={cohort.year.toString()}>
                    {cohort.japaneseEra}（{cohort.year}年）
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cohortGroup" className="mb-2 block text-sm font-medium text-gray-700">
                派遣隊次
              </label>
              <select
                id="cohortGroup"
                name="cohortGroup"
                value={profile.cohotGroup || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">派遣隊次を選択してください</option>
                {COHORTS.find((cohort) => cohort.year === Number(profile.cohortYear))?.groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="twitterUrl" className="mb-2 block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <input
                type="url"
                id="twitterUrl"
                name="twitterUrl"
                value={profile.twitterUrl || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="instagramUrl" className="mb-2 block text-sm font-medium text-gray-700">
                Instagram
              </label>
              <input
                type="url"
                id="instagramUrl"
                name="instagramUrl"
                value={profile.instagramUrl || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="websiteUrl" className="mb-2 block text-sm font-medium text-gray-700">
                ウェブサイト
              </label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                value={profile.websiteUrl || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
