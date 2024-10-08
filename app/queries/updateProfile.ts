import { UserType } from '@/app/type';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

async function updateProfile(profileData: Partial<UserType>): Promise<UserType> {
  const response = await fetch(`${API_URL}/api/me/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update profile');
  }

  return response.json();
}

export default updateProfile;
