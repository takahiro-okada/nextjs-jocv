const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchAllCohorts() {
  const res = await fetch(`${API_URL}/api/cohorts`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch deployment locations: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default fetchAllCohorts;
