import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  try {
    await prisma.$connect();

    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const countrySlug = pathSegments[pathSegments.length - 2];

    if (!countrySlug) {
      return NextResponse.json({ message: 'Country parameter is missing' }, { status: 400 });
    }

    const countryData = await prisma.country.findFirst({
      where: {
        slug: countrySlug,
      },
    });

    if (!countryData) {
      return NextResponse.json({ message: 'Country not found' }, { status: 404 });
    }

    const users = await prisma.user.findMany({
      where: {
        deploymentCountryId: countryData.id,
      },
      include: {
        deploymentCountry: true,
        currentCountry: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
