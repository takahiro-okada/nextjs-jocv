import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  try {
    await prisma.$connect();

    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const yearSlug = pathSegments[pathSegments.length - 1];

    if (!yearSlug) {
      return NextResponse.json({ message: 'Year parameter is missing' }, { status: 400 });
    }

    const cohorts = await prisma.cohort.findMany({
      where: {
        cohortYear: yearSlug,
      },
      include: {
        users: {
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
          },
        },
      },
    });

    if (!cohorts || cohorts.length === 0) {
      return NextResponse.json({ message: 'Cohorts not found for the given year' }, { status: 404 });
    }

    // Combine all users from different terms into a single array
    const combinedUsers = cohorts.flatMap((cohort) => cohort.users);

    // Create a single cohort object with combined users
    const combinedCohort = {
      id: `cohort-${yearSlug}`,
      name: `${yearSlug}年隊`,
      cohortYear: yearSlug,
      users: combinedUsers,
    };

    return NextResponse.json(combinedCohort, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
