import { UserType } from '@/app/type';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchUsersByCohortsYear(year: string): Promise<UserType[]> {
  const res = await fetch(`${API_URL}/api/users/cohorts/${year}`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default fetchUsersByCohortsYear;
