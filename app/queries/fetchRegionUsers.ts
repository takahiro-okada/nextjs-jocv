import { UserType } from '@/app/type';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

export default async function fetchRegionUsers(region: string): Promise<UserType[]> {
  const res = await fetch(`${API_URL}/api/deploymentlocations/${region}/users`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch region users: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
