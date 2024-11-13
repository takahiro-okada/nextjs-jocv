export interface AccountType {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: UserType;
}

export interface SessionType {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: UserType;
}

export interface UserType {
  id: string;
  name?: string;
  createdAt: Date;
  email?: string;
  emailVerified?: Date;
  image?: string;
  currentCountryId?: string;
  currentPrefectureId?: string;
  deploymentCountryId?: string;
  cohortYear?: number;
  cohortGroup?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  bio?: string;
  currentCountry?: CountryType;
  currentPrefecture?: PrefectureType;
  deploymentCountry?: CountryType;
  cohort?: CohortType;
  favoritedBy: FavoriteType[];
  favorites: FavoriteType[];
  accounts: AccountType[];
  sessions: SessionType[];
}

export interface PrefectureType {
  id: number;
  name: string;
  slug: string;
  countryId: string;
  areaId: string;
}

export interface DeploymentLocation {
  country: {
    id: string;
    name: string;
    slug: string;
    continent: string;
  };
  count: number;
}

export type CountryType = {
  id: string;
  name: string;
  slug: string;
  isDeveloping: boolean;
  countryCode?: string;
  continent: string;
  country?: string;
};
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
