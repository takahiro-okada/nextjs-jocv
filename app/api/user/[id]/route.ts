import { PrismaClient } from '@prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextResponse } from 'next/server';
import { enhanceUserData, EnhancedUser } from '@/utils/userDataEnhancer';

const prisma = new PrismaClient();

export const GET = async ({ params }: { params: Params }) => {
  try {
    const userId = params.id;
    console.log('userId', userId);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        email: true,
        emailVerified: true,
        image: true,
        currentCountryId: true,
        currentPrefectureId: true,
        deploymentCountryId: true,
        cohortYear: true,
        cohortGroup: true,
        twitterUrl: true,
        instagramUrl: true,
        websiteUrl: true,
        bio: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const enhancedUser: EnhancedUser = enhanceUserData(user);

    return NextResponse.json(enhancedUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
