import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserType } from '@/app/type';
import fetchLoginUser from '@/app/queries/fetchLoginUser';
import updateProfileAPI from '@/app/queries/updateProfile';

export function useProfile() {
  const { status } = useSession();
  const [profile, setProfile] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserProfile() {
      if (status === 'authenticated') {
        try {
          const userData = await fetchLoginUser();
          setProfile(userData);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load user profile');
        } finally {
          setIsLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setError('User is not authenticated');
        setIsLoading(false);
      }
    }

    loadUserProfile();
  }, [status]);

  const updateProfile = async (updatedProfile: Partial<UserType>) => {
    try {
      const result = await updateProfileAPI(updatedProfile);
      setProfile(result);
      return result;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
  };

  return { profile, isLoading, error, updateProfile };
}
