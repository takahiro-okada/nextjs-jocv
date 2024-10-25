import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const japanUsers = await prisma.user.count({
      where: {
        currentCountry: {
          slug: 'japan',
        },
      },
    });

    const overseasUsers = await prisma.user.count({
      where: {
        currentCountry: {
          slug: {
            not: 'japan',
          },
        },
      },
    });

    const japanPrefectures = await prisma.prefecture.findMany({
      where: {
        country: {
          slug: 'japan',
        },
      },
      include: {
        _count: {
          select: { users: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const countries = await prisma.country.findMany({
      where: {
        slug: {
          not: 'japan',
        },
      },
      include: {
        _count: {
          select: { currentUsers: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ japanUsers, overseasUsers, japanPrefectures, countries });
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
