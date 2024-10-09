import { UserType } from '@/app/type';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchLoginUser(): Promise<UserType | null> {
  try {
    const res = await fetch(`${API_URL}/api/me/`, {
      cache: 'no-cache',
      credentials: 'include',
    });

    if (!res.ok) {
      if (res.status === 401) {
        console.log('User is not authenticated');
        return null;
      }
      throw new Error('Failed to fetch login user');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching login user:', error);
    return null;
  }
}

export default fetchLoginUser;
