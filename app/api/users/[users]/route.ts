import { PrismaClient } from '@prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    const userId = params.users;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        currentCountry: {
          select: {
            name: true,
            slug: true,
            isDeveloping: true,
            continent: true,
          },
        },
        currentPrefecture: {
          select: {
            name: true,
            slug: true,
          },
        },
        deploymentCountry: {
          select: {
            name: true,
            slug: true,
            isDeveloping: true,
            continent: true,
          },
        },
        cohort: {
          select: {
            cohortYear: true,
            cohortTerm: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
