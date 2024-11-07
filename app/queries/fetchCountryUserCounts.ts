const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchCountryUserCounts(): Promise<Record<string, number> | null> {
  const res = await fetch(`${API_URL}/api/users/country-counts`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default fetchCountryUserCounts;
