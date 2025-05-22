import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { enhanceUserData, EnhancedUser } from '@/utils/userDataEnhancer';
import { Params } from 'next/dist/server/request/params';

const prisma = new PrismaClient();

export const GET = async (request: Request, props: { params: Promise<Params> }) => {
  const params = await props.params;
  try {
    let userId: string | undefined;
    if (Array.isArray(params.id)) {
      userId = params.id[0];
    } else {
      userId = params.id;
    }

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
