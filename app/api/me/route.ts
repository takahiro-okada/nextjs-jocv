import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/libs/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const formData = await request.formData();
    console.log('Received form data:', Object.fromEntries(formData));

    const updatedUserData: any = {
      name: formData.get('name'),
      bio: formData.get('bio'),
      twitterUrl: formData.get('twitterUrl'),
      instagramUrl: formData.get('instagramUrl'),
      websiteUrl: formData.get('websiteUrl'),
      currentCountryId: formData.get('currentCountryId'),
      currentPrefectureId: formData.get('currentPrefectureId'),
      deploymentCountryId: formData.get('deploymentCountryId'),
      cohortYear: formData.get('cohortYear'),
      cohortGroup: formData.get('cohortGroup'),
    };

    // Remove undefined values
    Object.keys(updatedUserData).forEach((key) => updatedUserData[key] === undefined && delete updatedUserData[key]);

    const imageFile = formData.get('image');
    if (imageFile && typeof imageFile !== 'string') {
      // Check if it's a File or Blob object
      if (imageFile instanceof Blob) {
        const buffer = await imageFile.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        updatedUserData.image = `data:${imageFile.type};base64,${base64Image}`;
      } else {
        console.warn('Received image is neither a string nor a Blob:', typeof imageFile);
      }
    } else if (typeof imageFile === 'string') {
      // If it's already a string (e.g., data URL), use it as is
      updatedUserData.image = imageFile;
    }

    console.log('Updating user with data:', updatedUserData);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedUserData,
    });

    console.log('User updated successfully:', updatedUser);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return NextResponse.json({ error: 'Failed to update profile', details: (error as Error).message }, { status: 500 });
  }
}
