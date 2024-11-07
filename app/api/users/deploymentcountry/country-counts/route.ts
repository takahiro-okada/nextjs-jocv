import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const countryCounts = await prisma.user.groupBy({
      by: ['deploymentCountryId'],
      _count: {
        id: true,
      },
    });

    const counts = countryCounts.reduce(
      (acc, curr) => {
        if (curr.deploymentCountryId !== null) {
          acc[curr.deploymentCountryId] = curr._count.id;
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
