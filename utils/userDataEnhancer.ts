import { COHORTS } from '@/constants/cohorts';
import { PREFECTURES } from '@/constants/prefectures';
import { COUNTRIES } from '@/constants/countries';

const cohortIndex = COHORTS.reduce(
  (acc, cohort) => {
    acc[cohort.id] = cohort;
    cohort.groups.forEach((group) => {
      acc[`${cohort.id}-${group.id}`] = { ...cohort, group };
    });
    return acc;
  },
  {} as Record<string, any>,
);

const prefectureIndex = PREFECTURES.reduce(
  (acc, prefecture) => {
    acc[prefecture.id] = prefecture;
    return acc;
  },
  {} as Record<string, any>,
);

const countryIndex = COUNTRIES.reduce(
  (acc, country) => {
    acc[country.id] = country;
    return acc;
  },
  {} as Record<string, any>,
);

export type EnhancedUser = {
  id: string;
  name: string;
  createdAt: string;
  email: string | null;
  emailVerified: string | null;
  image: string | null;
  currentCountry: (typeof COUNTRIES)[0] | null;
  currentPrefecture: (typeof PREFECTURES)[0] | null;
  deploymentCountry: (typeof COUNTRIES)[0] | null;
  cohort: (typeof COHORTS)[0] | null;
  cohortGroup: (typeof COHORTS)[0]['groups'][0] | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  websiteUrl: string | null;
  bio: string | null;
};

export function enhanceUserData(user: any): EnhancedUser {
  const cohortKey = `${user.cohortYear}-${user.cohortGroup}`;

  return {
    ...user,
    currentCountry: user.currentCountryId ? countryIndex[user.currentCountryId] : null,
    currentPrefecture: user.currentPrefectureId ? prefectureIndex[user.currentPrefectureId] : null,
    deploymentCountry: user.deploymentCountryId ? countryIndex[user.deploymentCountryId] : null,
    cohort: cohortIndex[user.cohortYear] || null,
    cohortGroup: cohortIndex[cohortKey]?.group || null,
  };
}
