const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

export default async function fetchCountry(country: string) {
  const res = await fetch(`${API_URL}/api/country/${country}/`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Country not found: ${country}`);
    }
    throw new Error(`Failed to fetch country: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
