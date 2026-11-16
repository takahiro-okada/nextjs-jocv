import { NextResponse } from 'next/server';
import { createPrismaClient } from '@/app/libs/prisma';


export async function GET() {
  const prisma = createPrismaClient();
  try {
    const countryCounts = await prisma.user.groupBy({
      by: ['currentCountryId'],
      _count: {
        id: true,
      },
    });

    const counts = countryCounts.reduce(
      (acc, curr) => {
        if (curr.currentCountryId !== null) {
          acc[curr.currentCountryId] = curr._count.id;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    return NextResponse.json(counts);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
