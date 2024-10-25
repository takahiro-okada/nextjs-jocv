const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

interface CohortTerm {
  id: string;
  term: string;
  name: string;
  userCount: number;
}

interface GroupedCohorts {
  year: string;
  terms: CohortTerm[];
  totalUsers: number;
}

async function fetchAllCohorts(): Promise<GroupedCohorts[]> {
  const res = await fetch(`${API_URL}/api/cohort`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch cohorts');
  }
  return res.json();
}

export default fetchAllCohorts;
