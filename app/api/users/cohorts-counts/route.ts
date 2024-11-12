import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cohortCounts = await prisma.user.groupBy({
      by: ['cohortYear'],
      _count: {
        id: true,
      },
    });

    const counts = cohortCounts.reduce(
      (acc, curr) => {
        if (curr.cohortYear !== null) {
          acc[curr.cohortYear] = curr._count.id;
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
