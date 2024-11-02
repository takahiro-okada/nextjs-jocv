import { COUNTRIES } from '@/constants/countries';

export default function getCountryIdBySlug(slug: string): string | undefined {
  const country = COUNTRIES.find((country) => country.slug === slug);
  return country ? country.countryCode : undefined;
}
