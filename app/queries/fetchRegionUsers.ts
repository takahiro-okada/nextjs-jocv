const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchRegionUsers(region: string) {
  const res = await fetch(`${API_URL}/api/deploymentlocations/${region}/users`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch region users: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default fetchRegionUsers;
