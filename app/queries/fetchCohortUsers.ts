const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchCohortUsers(year: number) {
  const res = await fetch(`${API_URL}/api/cohorts/${year}`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default fetchCohortUsers;
