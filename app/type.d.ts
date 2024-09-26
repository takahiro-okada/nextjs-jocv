export interface UserType {
  id: number;
  name: string;
  image: string;
  currentCountry: {
    id: string;
    name: string;
  };
  currentPrefecture: {
    id: string;
    name: string;
  };
  deploymentCountry: {
    id: string;
    name: string;
    slug: string;
    isDeveloping: boolean;
    continent: string;
  };
  bio: string;
}

export interface PrefectureType {
  id: string;
  name: string;
  country: {
    id: string;
    name: string;
  };
}

export interface DeploymentLocation {
  country: {
    id: string;
    name: string;
    slug: string;
  };
  count: number;
}

export interface CountryType {
  id: string;
  name: string;
  slug: string;
  isDeveloping: boolean;
  continent: string;
  currentUsers: UserType[];
  deployedUsers: UserType[];
  prefectures: PrefectureType[];
}

export interface CohortType {
  id: string;
  name: string;
  cohortYear: string;
  cohortTerm: string;
  users: UserType[];
}

export interface FavoriteType {
  id: string;
  userId: number;
  favoriteUserId: number;
  favoriteUser: UserType;
}
