export interface UserType {
  id: number;
  name: string;
  createdAt: string;
  image: string;
  currentAddressId: string;
  bio: string;
  deploymentLocationId: string;
  cohortId: string;
  twitterUrl: string;
  instagramUrl: string;
  websiteUrl: string;
  currentAddress: Address;
  deploymentLocation: DeploymentLocation;
  cohort: Cohort;
  favorites: Favorite[];
  favoritedBy: Favorite[];
}

export interface Address {
  id: string;
  countryId: string;
  prefectureId: string;
  city: string;
  otherAddressDetails: string;
  country: Country;
  prefecture: Prefecture;
  users: UserType[];
}

export interface Country {
  id: string;
  name: string;
  isDeveloping: boolean;
  addresses: Address[];
  deploymentLocations: DeploymentLocation[];
  prefectures: Prefecture[];
}

export interface Prefecture {
  id: string;
  name: string;
  countryId: string;
  country: Country;
  addresses: Address[];
}

export interface DeploymentLocation {
  id: string;
  countryId: string;
  specificLocation: string;
  country: Country;
  users: UserType[];
}

export interface Cohort {
  id: string;
  cohortYear: string;
  cohortTerm: string;
  users: UserType[];
}

export interface Favorite {
  id: string;
  userId: number;
  favoriteUserId: number;
  user: UserType;
  favoriteUser: UserType;
}
