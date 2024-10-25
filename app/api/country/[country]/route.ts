import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { country: string } }) {
  const { country } = params;

  try {
    const countryData = await prisma.country.findUnique({
      where: { slug: country },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (!countryData) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    return NextResponse.json(countryData);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
