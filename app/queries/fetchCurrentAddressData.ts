const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchAllCurrentCountry() {
  const res = await fetch(`${API_URL}/api/currentcountry`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch deployment locations: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default fetchAllCurrentCountry;
