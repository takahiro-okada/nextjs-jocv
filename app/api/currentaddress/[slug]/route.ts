import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const countryData = await prisma.country.findUnique({
      where: { slug: slug },
      include: {
        currentUsers: {
          select: {
            id: true,
            name: true,
            image: true,
            currentCountry: {
              select: {
                name: true,
                slug: true,
              },
            },
            currentPrefecture: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    console.log('Fetched country data:', countryData); // ログを追加

    if (!countryData) {
      console.log('Country not found'); // ログを追加
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: countryData.name,
      users: countryData.currentUsers,
    });
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
