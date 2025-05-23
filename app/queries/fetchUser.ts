import { UserType } from '@/app/type';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchUser(userId: number): Promise<UserType | null> {
  const res = await fetch(`${API_URL}/api/user/${userId}`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default fetchUser;
