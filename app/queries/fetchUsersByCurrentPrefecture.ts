import { UserType } from '@/app/type';
import getPrefectureIdBySlug from '@/utils/getPrefectureIdBySlug';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function fetchUsersByCurrentPrefecture(prefecture: string): Promise<UserType[]> {
  const prefectureData = getPrefectureIdBySlug(prefecture);
  const prefectureId = prefectureData ? prefectureData : '';
  const res = await fetch(`${API_URL}/api/users/prefecture/${prefectureId}`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default fetchUsersByCurrentPrefecture;
