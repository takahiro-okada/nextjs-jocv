const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchCountry(country: string) {
  const res = await fetch(`${API_URL}/api/country/${country}/`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch region users: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default fetchCountry;
