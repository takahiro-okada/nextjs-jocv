import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { prefecture: string } }) {
  const { prefecture } = params;

  try {
    const prefectureData = await prisma.prefecture.findUnique({
      where: { slug: prefecture },
      include: {
        users: {
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
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!prefectureData) {
      return NextResponse.json({ error: 'Prefecture not found' }, { status: 404 });
    }

    return NextResponse.json(prefectureData);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
