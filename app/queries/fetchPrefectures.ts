const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchPrefectures() {
  const res = await fetch(`${API_URL}/api/prefectures`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch prefectures');
  }
  return res.json();
}

export default fetchPrefectures;
