import { UserType } from '@/app/type';
import getCountryIdBySlug from '@/utils/getCountryIdBySlug';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchUsersByCurrentCountry(country: string): Promise<UserType[]> {
  const countryData = getCountryIdBySlug(country);
  const countryId = countryData ? countryData : '';
  const res = await fetch(`${API_URL}/api/users/currentaddress/${countryId}`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default fetchUsersByCurrentCountry;
